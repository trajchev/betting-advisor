const catchAsync = require('../../utils/catchAsync');
const models = require('../../models/models');
const createSendToken = require('../utils/createSendToken');
const Email = require('../../utils/Email');

const User = models.User;
const Recruits = models.Recruits;

const signup = catchAsync(async (req, res, next) => {

    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    // Check if we have a referral
    if (req.params.recruiter) {
    const user = await User.findOne({where: {username: req.params.recruiter}})

        if ( user ) {

            // If we have a referral, save the relationship
            const recruit = await Recruits.create({
                recruiterId: user.id,
                recruitId: newUser.id
            });

        }

    };


    // The link to the user profile
    const url = `${req.protocol}://${req.get('host')}/me`;

    // Send the welcome email
    await new Email(newUser, url).sendWelcome();

    // Gen&Send token to user to authenticate
    createSendToken(newUser, 201, req, res);

});

module.exports = signup;