const models = require('../../models/models');
const factory = require('../handlers/handlerFactory');

const getTeams = factory.getAll(models.Team);
const getTeam = factory.getOne(models.Team);
const updateTeam = factory.updateOne(models.Team);

module.exports = {
    getTeams,
    getTeam,
    updateTeam
};