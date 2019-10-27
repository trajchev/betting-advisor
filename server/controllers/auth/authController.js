const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const crypto = require('crypto');

const catchAsync = require('../../utils/catchAsync');
const BAError = require('../../utils/BAError');
const models = require('../../models/models');
const User = models.User;

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, 
    {expiresIn: process.env.JWT_EXPIRES_IN}
    )
};

const createAndSendToken = (user, statusCode, res) => {

    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });

}

const signup = catchAsync(async (req, res, next) => {

    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role || 'beginner'
    });

    createAndSendToken(newUser, 201, res);
});

const login = catchAsync(async (req, res,next) => {
    const {email, password} = await req.body;

    console.log('Req body ======================= ', req.body);

    // 1. Check if email and password exist
    if (!email || !password) {
        return next(new BAError('Please provide email and password', 400));
    }
    // 2. Check if user exists & password is correct
    const user = await User.findOne({where: {email}});

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new BAError('Incorrect email or password', 401));
    }

    // 3. If everything is OK send token to client
    createAndSendToken(user, 200, res);
});

const logout = (req, res) => {

    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({ status: 'success' });
};

const isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
      try {
        // 1) verify token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );
  
        // 2) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
          return next();
        }
  
        // 3) Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
          return next();
        }
  
        // THERE IS A LOGGED IN USER
        res.locals.user = currentUser;
        return next();
      } catch (err) {
        return next();
      }
    }
    next();
  };

const protect = catchAsync( async (req, res, next) => {

    let token;

    // 1. Getting token and check if its there
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new BAError('You are not logged in. Please log in to get access', 401));
    }

    // 2. Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const currentUser = await User.findOne({where: {id: decoded.id}});
    if (!currentUser) {
        return next(new BAError('The user no longer exists', 401));
    }

    // 4. Check if user change pass after token was issued
    if(currentUser.changedPassAfter(decoded.iat)) {
        return next(new BAError('User recently changed password. Please log in again', 401));
    }

    req.user = currentUser;
    // Grant  access to protected route
    next();
});

const restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles is an array
        if(!roles.includes(req.user.role)) {
            return next(new BAError('You do not have a permission to perform this action', 403))
        }

        next();
    }
}

const forgotPassword = catchAsync(async (req, res, next) => {
    // 1. Get user based on posted email
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
        return next(new BAError('There is no user with that email address', 404))
    }
    // 2. Generate random token
    const resetToken = user.createPasswordResetToken();
    await user.save();
    
    // 3. Send it to user email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Forgot your message? Submit a patch request with your new password and passwordConfirm to ${resetURL}. \nIf you didn't forget your password, please ignore this email`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 minutes)',
            message
        });
    
        res.status(200).json({
            status: 'success',
            messgae: 'Token sent to email!'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        return next(new BAError('There was an error sending email, try later', 500));
    }
});

const resetPassword = catchAsync(async (req, res, next) => {
    // 1. Get user based on token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({where: {passwordResetToken: hashedToken, passwordResetExpires: {[Op.gt]: Date.now()}}});

    // 2. If token has not expired set the new password
    if (!user) {
        return next(new AppError('Token is invalid or expires', 400));
    }
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm

    // 3. Update changedPasswordAt
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 4. Log the user in, sent JWT
    createAndSendToken(user, 201, res);

});

const updatePassword = catchAsync(async (req, res, next) => {
    // 1. Get user from collection
    const user = await User.findOne({where: {id: req.user.id}});

    // 2. Check if posted pass is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new BAError('Your current password is wrong', 401))
    }
    // 3. If pass is correct update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // 4. Log user In, send JWT
    createAndSendToken(user, 201, res);
});

module.exports = {
    signup,
    login,
    logout,
    isLoggedIn,
    protect,
    restrictTo,
    forgotPassword,
    resetPassword,
    updatePassword
};