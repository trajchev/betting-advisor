const express = require('express');

const controllers = require('../../controllers/controllers');

const authController = controllers.auth;
const leagueController = controllers.league;

const router = express.Router();

router.get('/', authController.protect, leagueController.getLeagues);
router.get('/:group', authController.protect, leagueController.getLeagues);

module.exports = router;