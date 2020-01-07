const express = require('express');

const homeController = require('../../controllers/controllers').home;

const router = express.Router();

router.get('/', homeController.getHomeStats);

module.exports = router;