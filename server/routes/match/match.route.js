const express = require('express');

const controllers = require('../../controllers/controllers');

const authController = controllers.auth;
const matchController = controllers.match;

const router = express.Router({mergeParams: true});

router.use(authController.protect);

router.route('/:league')
    .get(matchController.getMatches);

router.route('/:league/:id')
    .get(matchController.getMatch);

router.route('/:league/:id/h2h/:region?')
    .get(matchController.getMatchH2H);

router.route('/:league/:id/spreads/:region?')
    .get(matchController.getMatchSpreads);

router.route('/:league/:id/totals/:region?')
    .get(matchController.getMatchTotals);

module.exports = router;