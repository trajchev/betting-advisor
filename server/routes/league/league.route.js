const express = require('express');

const controllers = require('../../controllers/controllers');

const authController = controllers.auth;
const leagueController = controllers.league;

const router = express.Router();

router.use(authController.protect);

router.get('/', leagueController.getLeagues);
router.get('/:group', leagueController.getLeagues);

module.exports = router;