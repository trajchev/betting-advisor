const express = require('express');

const leagueController = require('../controllers/league');

const router = express.Router();

router.get('/sports', leagueController);

module.exports = router;