const express = require('express');

const controllers = require('../../controllers/controllers.js');

const authController = controllers.auth;
const siteController = controllers.site;

const router = express.Router();

router.use(authController.protect);

router.get('/', siteController.getSites);

module.exports = router;