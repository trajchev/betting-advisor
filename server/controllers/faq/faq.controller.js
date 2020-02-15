const models = require('../../models/models');
const factory = require('../../helpers/helper');

const FAQ = models.FAQ;

const getFAQs = factory.getAll(FAQ);
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