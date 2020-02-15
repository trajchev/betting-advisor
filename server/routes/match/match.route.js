const express = require('express');

const auth = require('../../auth/auth');
const controllers = require('../../controllers/controllers');

const matchController = controllers.match;
const saveMatchController = controllers.saveMatch;
const deleteMatchController = controllers.deleteMatch;

const router = express.Router({mergeParams: true});

router.use(auth.protect);

router.route('/')
    .post(saveMatchController);

router.route('/:league')
    .get(matchController.getMatches);

router.route('/:league/:id')
    .get(matchController.getMatch)
    .delete(deleteMatchController);

router.route('/:league/:id/h2h/:region?')
    .get(matchController.getMatchH2H);

router.route('/:league/:id/spreads/:region?')
    .get(matchController.getMatchSpreads);

router.route('/:league/:id/totals/:region?')
    .get(matchController.getMatchTotals);

module.exports = router;