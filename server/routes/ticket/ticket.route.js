const express = require('express');

const controllers = require('../../controllers/controllers');

const authController = controllers.auth;
const ticketController = controllers.ticket;

const router = express.Router({mergeParams: true});

router.use(authController.protect);

router.post('/', ticketController.createTicket);
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;