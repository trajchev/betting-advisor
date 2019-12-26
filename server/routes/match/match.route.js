const express = require('express');

const controllers = require('../../controllers/controllers');

const authController = controllers.auth;
const matchController = controllers.match;
const saveMatchController = controllers.saveMatch;
const deleteMatchController = controllers.deleteMatch;

const router = express.Router({mergeParams: true});

router.use(authController.protect);

router.route('/')
    .post(saveMatchController);

router.route('/:id')
    .get(matchController.getMatch)
    .delete(deleteMatchController);

router.route('/:id/h2h')
    .get(matchController.getMatchH2H);

router.route('/:id/spreads')
    .get(matchController.getMatchSpreads);

router.route('/:id/totals')
    .get(matchController.getMatchTotals);

router.route('/:league')
    .get(matchController.getMatches);

module.exports = router;