const express = require('express');
const { body } = require('express-validator');

const userModel = require('../models/user');
const userController = require('../controllers/user');

const router = express.Router();

// handle all tickets view route
// router.post('/user', userController.getTickets);

router.put(
    '/signup',(req, res, next) => {
        console.log('==================== Request =======================');
        console.log(req.body);
        next();
    },
    [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return userModel.fetchOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
    })
    .normalizeEmail(),
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

// router.post('/login', userController.login);

module.exports = router;