const express = require('express');

const controllers = require('../../controllers/controllers');

const authController = controllers.auth;
const ticketController = controllers.ticket;
const match2ticketController = controllers.match2ticket;

const router = express.Router({mergeParams: true});

router.use(authController.protect);

router.route('/')
    .get(ticketController.getTickets)
    .post(ticketController.createTicket)
    
router.route('/:id')
    .get(ticketController.getTicket)
    .patch(ticketController.updateTicket)
    .delete(ticketController.deleteTicket)

router.post('/match', match2ticketController.match2ticket);
router.delete('/match/:id', match2ticketController.removeMatchFromTicket);

module.exports = router;