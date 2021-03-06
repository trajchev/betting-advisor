const express = require('express');

const controllers = require('../../controllers/controllers');
const userController = controllers.user;
const authController = controllers.auth;

const router = express.Router();

router.post('/signup/:recruiter?', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser);
router.get('/dashboard', userController.getDashboardData);
router.get('/me/tickets/:perPage?/:page?', userController.getMe, userController.getMyTickets);
router.patch('/me/update', userController.uploadUserPhoto, userController.updateMe);
router.patch('/me/updatePassword', authController.updatePassword);
router.delete('/me/delete', userController.deleteMe);
router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.use(authController.restrictTo('admin'));

router.route('/')
    .get(userController.getAllUsers)

router.get('/me/admin', userController.getAdminDashboardData);
router.get('/me/tickets', userController.getAdminTickets);

module.exports = router;