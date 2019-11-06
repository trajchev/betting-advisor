const express = require('express');

const controllers = require('../../controllers/controllers');

const authController = controllers.auth;
const matchController = controllers.match;
const saveMatchController = controllers.saveMatch;

const router = express.Router({mergeParams: true});

router.get('/:league', authController.protect, matchController.getMatches);
router.get('/:league/:matchId', authController.protect, matchController.getMatchStats);
router.post('/:league/:matchId', authController.protect, saveMatchController);

module.exports = router;