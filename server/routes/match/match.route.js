const express = require('express');

const controllers = require('../../controllers/controllers');

const matchController = controllers.match;

const router = express.Router();

router.get('/matches/:league', matchController.getMatchesFromDB);

module.exports = router;