const express = require('express');

const auth = require('../../auth/auth');
const controllers = require('../../controllers/controllers');

const teamController = controllers.team;

const router = express.Router();

router.use(auth.protect);

router.get('/', teamController.getTeams);
router.get('/:id', teamController.getTeam);
router.patch('/:id', teamController.uploadTeamLogo, teamController.updateTeam);

module.exports = router;