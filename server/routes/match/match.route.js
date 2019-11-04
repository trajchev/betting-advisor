const express = require('express');

const controllers = require('../../controllers/controllers');

const matchController = controllers.match;
const saveMatchController = controllers.saveMatch;

const router = express.Router({mergeParams: true});

router.get('/:league', matchController.getMatches);
router.get('/:league/:matchId', matchController.getMatchStats);
router.post('/:league/:matchId', saveMatchController);

module.exports = router;