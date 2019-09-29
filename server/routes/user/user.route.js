const express = require('express');
const { body } = require('express-validator');

const models = require('../../models/models');
const controllers = require('../../controllers/controllers');

const User = models.User;
const userController = controllers.user;

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
          return User.findOne({ where: { email: value }}).then(user => {
            // users is matched user obj
            if (user) {
              return Promise.reject('E-Mail address already exists!');
            }
          });
      }),
      body('password')
          .trim()
          .isLength({min: 6}),
      body('username')
          .trim()
          .not()
          .isEmpty()
          .isLength({min: 6})
    ],
    userController.signup
);

router.post('/login', userController.login);

module.exports = router;