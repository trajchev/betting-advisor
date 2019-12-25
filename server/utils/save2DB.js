const models = require('../models/models');
const catchAsync = require('./catchAsync');

const Totals = models.Totals;
const Spreads = models.Spreads;
const H2H = models.H2H;

const checkSaveTotals = catchAsync(async ( siteObj, matchResult, siteID ) => {

    const totalsRes = await Totals.findOne({where: {
        match_id: matchResult.id,
        site_id: siteID
    }})

    if ( !totalsRes ) {
        const total = await Totals.create({
            type: 'totals',
            position_over: siteObj.odds.totals.position[0],
            position_under: siteObj.odds.totals.position[1],
            odds_home: siteObj.odds.totals.odds[0],
            odds_away: siteObj.odds.totals.odds[1],
            points_home: siteObj.odds.totals.points[0],
            points_away: siteObj.odds.totals.points[1],
            match_id: matchResult.id,
            site_id: siteID
        });

        return total;
    }

});

const checkSaveSpreads = catchAsync( async ( siteObj, matchResult, siteID ) => {

    const spreadsRes = await Spreads.findOne({where: {
        match_id: matchResult.id,
        site_id: siteID
    }});

    if ( !spreadsRes ) {
        const spread = await Spreads.create({
            type: 'spreads',
            odds_home: siteObj.odds.spreads.odds[0],
            odds_away: siteObj.odds.spreads.odds[1],
            points_home: siteObj.odds.spreads.points[0] * 1,
            points_away: siteObj.odds.spreads.points[1] * 1,
            match_id: matchResult.id,
            site_id: siteID
        });

        return spread;
    }

});

const checkSaveH2H = catchAsync( async ( siteObj, matchResult, siteID) => {

    const h2hRes = await H2H.findOne({where: {
        match_id: matchResult.id,
        site_id: siteID
    }})

    if ( !h2hRes ) {
        const h2h = await H2H.create({
            type: 'h2h',
            odds_home: siteObj.odds.h2h[0],
            odds_draw: siteObj.odds.h2h[1],
            odds_away: siteObj.odds.h2h[2],
            match_id: matchResult.id,
            site_id: siteID
        });

        return h2h;
    }

});

module.exports = {

    checkSaveTotals,
    checkSaveSpreads,
    checkSaveH2H

}