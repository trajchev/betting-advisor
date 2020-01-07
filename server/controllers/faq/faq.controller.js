const models = require('../../models/models');
const factory = require('../handlers/handlerFactory');

const FAQ = models.FAQ;

const getFAQs = factory.getAllPublic(FAQ);
const getFAQ = factory.getOne(FAQ);
const updateFAQ = factory.updateOne(FAQ);
const createFAQ = factory.createOne(FAQ);
const deleteFAQ = factory.deleteOne(FAQ);

module.exports = {
    
    getFAQ,
    getFAQs,
    createFAQ,
    updateFAQ,
    deleteFAQ

};