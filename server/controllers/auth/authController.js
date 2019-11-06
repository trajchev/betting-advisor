const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const crypto = require('crypto');

const catchAsync = require('../../utils/catchAsync');
const BAError = require('../../utils/BAError');
const Email = require('../../utils/Email');
const models = require('../../models/models');
const User = models.User;

const signToken = id => {
    return jwt.sign({ id: id, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.JWT_SECRET);
};

const createSendToken = (user, statusCode, req, res) => {

    const token = signToken(user.id);
    const expTime = Date.now() + process.env.JWT_EXPIRES_IN * 1;

    const tokenOptions = {
        expires: new Date(expTime),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    };

    res.cookie('jwt', token, tokenOptions);

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
        passwordConfirm: req.body.passwordConfirm
    });

    const url = `${req.protocol}://${req.get('host')}/me`;

    await new Email(newUser, url).sendWelcome();

    createSendToken(newUser, 201, req, res);
});

const login = catchAsync(async (req, res,next) => {

    const {email, password} = await req.body;

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
    createSendToken(user, 200, req, res);
});

const logout = (req, res) => {

    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 1000),
        httpOnly: true
    });

    res.status(200).json({ status: 'success' });
};

const protect = catchAsync( async (req, res, next) => {

    let token;

    // 1. Getting token and check if its there
    if (
        req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')
        ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    } else if (req.headers.cookie) {
        token = req.headers.cookie.split('=')[1];
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

    // Grant  access to protected route
    req.user = currentUser;
    res.locals.user = currentUser;
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
    const message = `Forgot your Password? Submit a patch request with your new password and passwordConfirm to ${resetURL}. \nIf you didn't forget your password, please ignore this email`;

    try {

        await new Email(user, resetURL).sendPasswordReset();
    
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
    const user = await User.findOne({where: {passwordResetToken: hashedToken}});

    // 2. If token has not expired set the new password
    if (!user || !user.passwordResetToken) {

        res.json({
            status: 'fail',
            message: 'Token is invalid or expired'
        });
        return next(new BAError('Token is invalid or expired', 400));
    }
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm

    // 3. Update changedPasswordAt
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    // 4. Log the user in, sent JWT
    createSendToken(user, 201, req, res);

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
    createSendToken(user, 201, res);
});

module.exports = {
    signup,
    login,
    logout,
    protect,
    restrictTo,
    forgotPassword,
    resetPassword,
    updatePassword
};