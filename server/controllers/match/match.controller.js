const models = require('../../models/models');
const factory = require('../handlers/handlerFactory');

const getMatches = factory.getAll(models.Match);
const getMatch = factory.getOneAssoc(models.Match, models.Odd, 'odds');

module.exports = {
    getMatches,
    getMatch
};