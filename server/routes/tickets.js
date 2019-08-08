const express = require('express');

const router = express.Router();

const ticketController = require('../controllers/ticket');

// handle all tickets view route
router.get('/tickets', ticketController.getTickets);

module.exports = router;