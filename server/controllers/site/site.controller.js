const models = require('../../models/models');
const factory = require ('../handlers/handlerFactory');

const getSites = factory.getAll(models.Site);

module.exports = {
    getSites
};