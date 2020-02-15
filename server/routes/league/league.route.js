const express = require('express');

const controllers = require('../../controllers/controllers');
const auth = require('../../auth/auth');

const leagueController = controllers.league;

const router = express.Router();

router.use(auth.protect);

router.get('/', leagueController.getLeagues);
router.get('/:group', leagueController.getLeagues);

module.exports = router;