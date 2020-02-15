const express = require('express');

const auth = require('../../auth/auth');
const controllers = require('../../controllers/controllers');

// const User = models.User;
const userController = controllers.user;

const router = express.Router();

router.post('/signup/:recruiter?', auth.signup);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.post('/forgotPassword', auth.forgotPassword);
router.patch('/resetPassword/:token', auth.resetPassword);

// Protect all routes after this middleware
router.use(auth.protect);

router.get('/me', userController.getMe, userController.getUser);
router.get('/dashboard', userController.getDashboardData);
router.get('/me/tickets/:perPage?/:page?', userController.getMe, userController.getMyTickets);
router.patch('/me/update', userController.uploadUserPhoto, userController.updateMe);
router.patch('/me/updatePassword', auth.updatePassword);
router.delete('/me/delete', userController.deleteMe);
router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.use(auth.restrictTo('admin'));

router.route('/')
    .get(userController.getAllUsers)

router.get('/me/admin', userController.getAdminDashboardData);
router.get('/me/tickets', userController.getAdminTickets);

module.exports = router;