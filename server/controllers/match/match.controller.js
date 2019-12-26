const models = require('../../models/models');
const factory = require('../handlers/handlerFactory');

const getMatches = factory.getAll(models.Match);
const getMatch = factory.getOneAssoc(models.Match, models.H2H, 'h2hs');
const getMatchH2H = factory.getOneAssocSite(models.Match, models.H2H, 'h2hs');
const getMatchSpreads = factory.getOneAssocSite(models.Match, models.Spreads, 'spreads');
const getMatchTotals = factory.getOneAssocSite(models.Match, models.Totals, 'totals');

module.exports = {
    getMatches,
    getMatch,
    getMatchH2H,
    getMatchSpreads,
    getMatchTotals
};