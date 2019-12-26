const express = require('express');

const controllers = require('../../controllers/controllers');

const authController = controllers.auth;
const teamController = controllers.team;

const router = express.Router();

router.use(authController.protect);

router.get('/', teamController.getTeams);

module.exports = router;