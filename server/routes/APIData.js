const express = require('express');

const router = express.Router();

const sportController = require('../controllers/sport');
const matchController = require('../controllers/match');
const checkAuth = require('../middleware/is-auth');

// handle Retrieve sports and odds from the odds api route
router.get('/sports', sportController);

// handle Retrieve matches from the odds api route
router.get('/matches', matchController);

module.exports = router;