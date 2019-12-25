const models = require('../models/models');

const Totals = models.Totals;
const Spreads = models.Spreads;
const H2H = models.H2H;

const checkSaveTotals = ( siteObj, matchResult, siteID ) => {

    Totals.findOne({where: {
        match_id: matchResult.id,
        site_id: siteID
    }})
    .then(totalsRes => {

        if ( !totalsRes ) {
            const total = new Totals({
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
    
            return total.save();
        }

        return null;

    })
    .catch(err => {
        console.log('Error status', err.response.status);
        throw new Error(err)
    });

};

const checkSaveSpreads = ( siteObj, matchResult, siteID ) => {

    Spreads.findOne({where: {
        match_id: matchResult.id,
        site_id: siteID
    }})
    .then(spreadsRes => {

        if ( !spreadsRes ) {
            const spread = new Spreads({
                type: 'spreads',
                odds_home: siteObj.odds.spreads.odds[0],
                odds_away: siteObj.odds.spreads.odds[1],
                points_home: siteObj.odds.spreads.points[0] * 1,
                points_away: siteObj.odds.spreads.points[1] * 1,
                match_id: matchResult.id,
                site_id: siteID
            });
    
            return spread.save();
        }
    })
    .catch(err => {
        console.log('Error status', err.response.status);
        throw new Error(err)
    });

}

const checkSaveH2H = ( siteObj, matchResult, siteID) => {

    H2H.findOne({where: {
        match_id: matchResult.id,
        site_id: siteID
    }})
    .then(h2hRes => {

        if ( !h2hRes ) {
            const h2h = new H2H({
                type: 'h2h',
                odds_home: siteObj.odds.h2h[0],
                odds_draw: siteObj.odds.h2h[1],
                odds_away: siteObj.odds.h2h[2],
                match_id: matchResult.id,
                site_id: siteID
            });
    
            return h2h.save();
        }

    })
    .catch(err => {
        console.log('Error status', err.response.status);
        throw new Error(err)
    });

}

module.exports = {

    checkSaveTotals,
    checkSaveSpreads,
    checkSaveH2H

}