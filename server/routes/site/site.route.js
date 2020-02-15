const express = require('express');

const auth = require('../../auth/auth');
const controllers = require('../../controllers/controllers');

const siteController = controllers.site;

const router = express.Router();

router.use(auth.protect);

router.get('/', siteController.getSites);
router.get('/:id', siteController.getSite);
router.patch('/:id', siteController.updateSite);

module.exports = router;