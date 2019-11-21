const models = require('../../models/models');
const factory = require('../handlers/handlerFactory');

const getLeagues = factory.getAll(models.Sport);

module.exports = {
    getLeagues
};