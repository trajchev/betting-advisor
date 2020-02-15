const express = require('express');

const auth = require('../../auth/auth');
const controllers = require('../../controllers/controllers');

const ticketController = controllers.ticket;
const match2ticketController = controllers.match2ticket;

const router = express.Router({mergeParams: true});

router.use(auth.protect);

router.get('/', ticketController.getTickets);
router.get('/:id', ticketController.getTicket);
router.post('/match', match2ticketController.match2ticket);
router.delete('/match/:id', match2ticketController.removeMatchFromTicket);
router.patch('/:id', ticketController.updateTicket);
router.post('/', ticketController.createTicket);

router.delete('/:id', ticketController.deleteTicket);

module.exports = router;