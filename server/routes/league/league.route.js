const express = require('express');

const controllers = require('../../controllers/controllers');

const leagueController = controllers.league;

const router = express.Router();

router.get('/all', leagueController.getLeagues);
router.get('/:group', leagueController.getLeaguesOfGroup);

module.exports = router;