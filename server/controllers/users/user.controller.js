const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const models = require('../../models/models');
const User = models.User;

// Signup
module.exports.signup = (req, res, next) => {
    // Check for errors in the request
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({ errors });
    }
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    const username = req.body.username;
    const email = req.body.email;

    if (password === passwordConfirm) {
        // Hash the password and save the user with the email and username
        bcrypt
        .hash(password, 10)
        .then(hashedPass => {
            const user = new User({
                username: username,
                email: email,
                password: hashedPass,
                passwordConfirm: hashedPass
            });
            return user.save();
        })
        .then(result => {
            // Return the ID for the created user for future use
            res.status(201).json({ message: 'User successfully created', userId: result.dataValues.id});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            res.status(500).json({error: err});
            next(err);
        });
    } else {
        return new Error('Password and confirmed password do not match', 500);
    }
}

// Login
module.exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const hourInSeconds = 60 * 60 ;
    let loadedUser;

    // Check if a user with the entered email exists
    User.findOne({ where: { email: email }}).then(user => {
        // check if the user exists
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        // compare the 
        return bcrypt.compare(password, loadedUser.dataValues.password);
    })
    .then(isEqual => {
        // Check if entered pass and pass in db do not match
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        // If passwords match, create the token and send it as JSON
        const token = jwt.sign({email: loadedUser.email, userId: loadedUser.id}, 'Betwisor', {expiresIn: 3600});

        res.status(200).json({token: token, userId: loadedUser.id, expiresIn: hourInSeconds, user: loadedUser});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

module.exports.user = (req, res, next) => {
    const id = req.params.id;
    // Check if a user with the entered email exists
    User.findOne({ where: { id }}).then(user => {
        // check if the user exists
        if (!user) {
            const error = new Error('The user could not be found');
            error.statusCode = 401;
            throw error;
        }
        const activeUser = {
            username: user.username,
            email: user.email,
            created: user.createdAt,
            updated: user.updatedAt
        };
        // compare the 
        res.status(200).json({message: 'success', user: activeUser});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}