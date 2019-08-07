const express = require('express');

const router = express.Router();

const ticketsController = require('../controllers/tickets');

// Handle single ticket route
router.post('/ticket', ticketsController.getTicket);

// handle delete (single) ticket route
router.delete('/tickets/:id', ticketsController.deleteTicket);

// Handle single ticket view route
router.put('/tickets/:id', ticketsController.getTicketById);

// handle all tickets view route
router.get('/tickets', ticketsController.getTickets);

module.exports = router;