const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Signup
module.exports.signup = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;
    bcrypt
        .hash(password, 12)
        .then(hashedPass => {
            const user = new User({
                username: username,
                email: email,
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

// Login
module.exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    User.findAll({ where: { email: email }}).then(user => {

        if (user.length < 0) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user[0].dataValues.password);
    })
    .then(isEqual => {
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser.id
            },
            'Betwisor',
            {expiresIn: '1h'}
        );

        res.status(200).json({token: token, userId: loadedUser.id});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}