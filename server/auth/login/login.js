const catchAsync = require('../../utils/catchAsync');
const BAError = require('../../utils/BAError');
const models = require('../../models/models');
const createSendToken = require('../utils/createSendToken');

const User = models.User;

const login = catchAsync(async (req, res, next) => {

    const {email, password} = await req.body;

    // 1. Check if email and password exist
    if (!email || !password) {
        return next(new BAError('Please provide email and password', 400));
    }

    // 2. Check if user exists & password is correct
    const user = await User.findOne({where: {email, active: true}});

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new BAError('Incorrect email or password', 401));
    }

    // 3. If everything is OK send token to client
    createSendToken(user, 200, req, res);

});

module.exports = login;