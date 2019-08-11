const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const userController = require('../controllers/user');

const router = express.Router();

router.put(
    '/signup',
    [
    body('email')
      .isEmail()
      .normalizeEmail()
      .custom(value => {
        return User.findAll({ where: { email: value }}).then(user => {
          if (user.length > 0) {
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