const models = require('../../models/models');
const catchAsync = require('../../utils/catchAsync');
const BAError = require('../../utils/BAError');
const createSendToken = require('../utils/createSendToken');

const User = models.User;

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

module.exports = updatePassword;