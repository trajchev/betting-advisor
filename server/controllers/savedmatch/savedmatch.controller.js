const models = require('../../models/models');
const factory = require('../../helpers/helper');

const SavedMatch = models.SavedMatch;

const saveMatch = factory.createOneAssoc(SavedMatch);
const deleteMatch = factory.deleteOne(SavedMatch);

module.exports = { saveMatch, deleteMatch };