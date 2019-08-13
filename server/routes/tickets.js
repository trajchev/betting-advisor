const express = require('express');

const router = express.Router();

const ticketController = require('../controllers/ticket');
const checkAuth = require('../middleware/is-auth');

// handle all tickets view route
router.get('/tickets', checkAuth, ticketController.getTickets);

module.exports = router;