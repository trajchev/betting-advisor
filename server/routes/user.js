const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const userController = require('../controllers/user');

const router = express.Router();

router.put(
    '/signup',
    [
    // Check and sanitize user input
    body('email')
      .isEmail()
      .normalizeEmail()
      .custom(value => {
        // Check if the email is already in use by querying the db
        return User.findAll({ where: { email: value }}).then(users => {
          // users is an array of matched user obj or empty
          if (users.length > 0) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
    }),
    body('password')
        .trim()
        .isLength({min: 5}),
    body('username')
        .trim()
        .not()
        .isEmpty()
    ],
    userController.signup
);

router.post('/login', userController.login);

module.exports = router;