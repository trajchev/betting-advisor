const express = require('express');
const auth = require('../../auth/auth');

const controllers = require('../../controllers/controllers');
const faqControllers = controllers.faq;

const router = express.Router();

router.get('/', faqControllers.getFAQs);

router.use(auth.protect);
router.use(auth.restrictTo('admin'));


router.post('/', faqControllers.createFAQ);

router.route('/:id')
    .get(faqControllers.getFAQ)
    .patch(faqControllers.updateFAQ)
    .delete(faqControllers.deleteFAQ);

module.exports = router;