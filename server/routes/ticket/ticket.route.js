const express = require('express');

const controllers = require('../../controllers/controllers');

const authController = controllers.auth;
const userController = controllers.user;
const ticketController = controllers.ticket;

const router = express.Router({mergeParams: true});

router.use(authController.protect);

router.post('/', userController.getMe, ticketController.createTicket);

module.exports = router;