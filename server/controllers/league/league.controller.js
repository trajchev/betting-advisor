const models = require('../../models/models');
const factory = require('../../helpers/helper');

const getLeagues = factory.getAll(models.Sport);

module.exports = {
    getLeagues
};