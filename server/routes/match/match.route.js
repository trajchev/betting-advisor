const express = require('express');

const controllers = require('../../controllers/controllers');

const matchController = controllers.match;

const router = express.Router();

router.get('/:league', matchController.getMatchesFromDB);
router.get('/:league/:matchId', matchController.getMatchStats);

module.exports = router;