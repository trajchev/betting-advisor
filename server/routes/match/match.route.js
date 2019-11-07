const express = require('express');

const controllers = require('../../controllers/controllers');

const authController = controllers.auth;
const matchController = controllers.match;
const saveMatchController = controllers.saveMatch;

const router = express.Router({mergeParams: true});

router.use(authController.protect);

router.route('/:league')
    .get(matchController.getMatches);

router.route('/:league/:matchId')
    .get(matchController.getMatch)
    .post(saveMatchController);

module.exports = router;