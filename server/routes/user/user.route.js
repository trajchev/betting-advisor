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