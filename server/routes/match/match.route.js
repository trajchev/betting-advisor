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

router.route('/:ticketId')
    .delete(deleteMatchController);

router.route('/:league')
    .get(matchController.getMatches);

router.route('/:league/:matchId')
    .get(matchController.getMatch)

module.exports = router;