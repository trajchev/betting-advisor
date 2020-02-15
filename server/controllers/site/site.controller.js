const models = require('../../models/models');
const factory = require ('../../helpers/helper');

const getSites = factory.getAll(models.Site);
const getSite = factory.getOne(models.Site);
const updateSite = factory.updateOne(models.Site);

module.exports = {
    getSites,
    getSite,
    updateSite
};