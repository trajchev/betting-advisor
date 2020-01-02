const express = require('express');

const controllers = require('../../controllers/controllers');

const authController = controllers.auth;
const faqControllers = controllers.faq;

const router = express.Router();

router.get('/', faqControllers.getFAQs);

router.use(authController.protect);
router.use(authController.restrictTo('admin'));


router.post('/', faqControllers.createFAQ);

router.route('/:id')
    .get(faqControllers.getFAQ)
    .patch(faqControllers.updateFAQ)
    .delete(faqControllers.deleteFAQ);

module.exports = router;