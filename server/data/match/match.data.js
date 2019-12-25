const axios = require('axios');

const fs = require('fs');
const path = require('path');

const models = require('../../models/models');

const Match = models.Match;
const Odd = models.Odd;
const Team = models.Team;
const Site = models.Site;
const Totals = models.Totals;
const Spreads = models.Spreads;
const H2H = models.H2H;

const pullMatchesOdds = (sport, region, oddsType) => {
    axios.get(`${process.env.API_URL}odds`, {
        params: {
            api_key: process.env.API_KEY,
            sport: sport,
            region: region,
            mkt: oddsType
        }
    })
    .then(response => {
        response.data.data.forEach(dataObj => {
            // Create the Match and save to db
            const match = new Match({
                home_team: dataObj.teams[0],
                away_team: dataObj.teams[1],
                commence_time: dataObj.commence_time,
                sport_key: dataObj.sport_key,
            });

            return match.save()
            .then(matchData => {
                dataObj.sites.forEach(site => {
                    // Create odd and save to db
                    const type = Object.keys(site.odds)[0];
                    const oddsArr = site.odds[type];
                    const odd = new Odd({
                        type: type,
                        home_team: oddsArr[0],
                        draw: oddsArr[1],
                        away_team: oddsArr[2],
                        match_id: matchData.dataValues.id
                    });
        
                    return odd.save()
                });
            });
        })
    
    })
    .catch(err => {
        console.log('Error status', err.response.status);
        console.log(err.response.data);
    });
};

const getMatchesOdds = () => {
    const matchesPath = path.join(__dirname, '/h2hEPL.json')

    const rawMatches = fs.readFileSync(matchesPath, error => {
        if (error) {
            return new Error(error);
        }
    });

    const matches = JSON.parse(rawMatches);

    matches.data.forEach(matchObj => {

        matchObj.teams.forEach(team => {
            Team.findOne({
                where: {
                    name: team
                }
            })
            .then(teamRes => {
                if (!teamRes) {
                    const team = new Team({
                        name: matchObj.teams[0],
                        sport_name: matchObj.sport_nice.replace(/[^0-9a-z- ]/gi, ''),
                        sport_key: matchObj.sport_key
                    });
    
                    return team.save();
                }
            })
            .catch(err => {
                console.log('Error status', err);
                return new Error(err);
            });
        });

        Match.findOne({where: {
            home_team: matchObj.teams[0],
            away_team: matchObj.teams[1],
            commence_time: matchObj.commence_time}
        })
        .then(matchResult => {
            if (!matchResult) {
                // Create the Match and save to db
                const match = new Match({
                    home_team: matchObj.teams[0],
                    away_team: matchObj.teams[1],
                    commence_time: matchObj.commence_time,
                    sport_key: matchObj.sport_key,
                });

                match.save();
            }

            matchObj.sites.forEach(siteObj => {

                const type = Object.keys(siteObj.odds)[0];

                let siteID;

                Site.findOne({
                    where: {
                        key: siteObj.site_key
                    }
                })
                .then(siteRes => {
                    if (!siteRes) {
    
                        const site = new Site({
                            key: siteObj.site_key,
                            name: siteObj.site_nice
                        });
    
                        const savedSite = site.save();

                        siteID = savedSite.id;

                        if (type === 'totals') {

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
                            })
                        } else if (type === 'spreads') {

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

                        } else if ( type === 'h2h' ) {

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

                        }

                    }

                    siteID = siteRes.id;
                    
                    if (type === 'totals') {

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
                        })
                    } else if (type === 'spreads') {

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

                    } else if ( type === 'h2h' ) {

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

                    }
                })
                .catch(err => {
                    console.log('Error status', err);
                    return new Error(err);
                });

                // console.log('SITE ================================= ', siteObj.odds.totals);

            })
        })
        .catch(err => {
            console.log('Error status', err);
            return new Error(err);
        });
        

    });
}

module.exports = { pullMatchesOdds, getMatchesOdds };