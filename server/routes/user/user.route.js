const express = require('express');
// const { body } = require('express-validator');

// const models = require('../../models/models');
const controllers = require('../../controllers/controllers');

// const User = models.User;
const userController = controllers.user;
const authController = controllers.auth;

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.uploadUserPhoto, userController.updateMe);
router.patch('/updateMyPassword', authController.updatePassword);
router.delete('/deleteMe', userController.deleteMe);
router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.use(authController.restrictTo('admin'));

router.route('/')
    .get(userController.getAllUsers);

module.exports = router;

// router.put(
//     '/signup',
//     [
//       // Check and sanitize user input
//       body('email')
//         .isEmail()
//         .normalizeEmail()
//         .custom(value => {
//           // Check if the email is already in use by querying the db
//           return User.findOne({ where: { email: value }}).then(user => {
//             // users is matched user obj
//             if (user) {
//               return Promise.reject('E-Mail address already exists!');
//             }
//           });
//       }),
//       body('password')
//           .trim()
//           .isLength({min: 6}),
//       body('username')
//           .trim()
//           .not()
//           .isEmpty()
//           .isLength({min: 6})
//     ],
//     userController.signup
// );

// router.post('/login', userController.login);

// router.get('/user/:id', userController.user)

// module.exports = router;