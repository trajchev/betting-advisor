const models = require('../../models/models');
const factory = require('../handlers/handlerFactory');

const Sport = models.Sport;

const getLeagues = factory.getAll(Sport, null);

module.exports = {
    getLeagues
};