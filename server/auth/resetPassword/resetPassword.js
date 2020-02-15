const crypto = require('crypto');

const BAError = require('../../utils/BAError');
const catchAsync = require('../../utils/catchAsync');
const createSendToken = require('../utils/createSendToken');
const models = require('../../models/models');

const User = models.User;

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

module.exports = resetPassword;