const models = require('../../models/models');
const factory = require('../../helpers/helper');
const BAError = require('../../utils/BAError');
const catchAsync = require('../../utils/catchAsync');

const getAssocSite = (Model, AssocModel, assocAlias) => catchAsync( async(req, res, next) => {

    let regionCondition = {};

    if (req.params.region) {
        regionCondition = {
            region: req.params.region
        }
    }

    const doc = await Model.findOne({ where: { id: req.params.id }, include: [{model: AssocModel, as: assocAlias, include: [{model: Site, where: regionCondition, attributes: ['name', 'region']}]}]});

    if (!doc) { return next(new BAError('No Document found with that id', 404));}

    res.status(200).json({
        status: 'success',
        data: doc
    });

});

const getMatches = factory.getAll(models.Match);
const getMatch = factory.getOneAssoc(models.Match, models.H2H, 'h2hs');
const getMatchH2H = getAssocSite(models.Match, models.H2H, 'h2hs');
const getMatchSpreads = getAssocSite(models.Match, models.Spreads, 'spreads');
const getMatchTotals = getAssocSite(models.Match, models.Totals, 'totals');

module.exports = {
    getMatches,
    getMatch,
    getMatchH2H,
    getMatchSpreads,
    getMatchTotals
};