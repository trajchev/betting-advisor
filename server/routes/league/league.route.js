const express = require('express');

const controllers = require('../../controllers/controllers');

const leagueController = controllers.league;

const router = express.Router();

router.get('/sports', leagueController);

module.exports = router;