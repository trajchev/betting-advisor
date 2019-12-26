const models = require('../../models/models');
const factory = require('../handlers/handlerFactory');

const getTeams = factory.getAll(models.Team);

module.exports = {
    getTeams
};