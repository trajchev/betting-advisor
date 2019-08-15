const express = require('express');

const router = express.Router();

const sportController = require('../controllers/sport');
const checkAuth = require('../middleware/is-auth');

// handle Retrieve sports from the odds api route
router.get('/fill-sports-database', sportController.fillSportsData);

// Gett all sports route
router.get('/sports', sportController.getSports);

module.exports = router;