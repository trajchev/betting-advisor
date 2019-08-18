const express = require('express');

const router = express.Router();

const siteController = require('../controllers/site');
const checkAuth = require('../middleware/is-auth');

// handle Retrieve sports from the odds api route
router.post('/fill-sites-database', siteController.fillSitesData);

// Gett all sports route
// router.get('/sports', sportController.getSports);

module.exports = router;