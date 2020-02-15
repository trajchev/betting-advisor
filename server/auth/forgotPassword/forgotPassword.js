const catchAsync = require('../../utils/catchAsync');
const BAError = require('../../utils/BAError');
const Email = require('../../utils/Email');
const models = require('../../models/models');

const User = models.User;

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
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`;

    try {

        await new Email(user, resetURL).sendPasswordReset();
    
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });

    } catch (err) {

        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        return next(new BAError('There was an error sending email, try later', 500));

    }

});

module.exports = forgotPassword;