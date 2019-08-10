const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports.signup = (req, res, next) => {
    console.log('==================== Request =======================');
    console.log(req.body);

    const errors = validationResult(req.body);

    if(!errors.isEmpty()) {
        const error = new Error('Validation failed!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const password = req.body.password;
    bcrypt
        .hash(password, 12)
        .then(hashedPass => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass,
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({ message: 'User successfully created', userId: result.dataValues.id});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}