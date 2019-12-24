const axios = require('axios');

const fs = require('fs');
const path = require('path');

const models = require('../../models/models');

const Match = models.Match;
const Odd = models.Odd;
const Team = models.Team;
const Site = models.Site;

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
    const matchesPath = path.join(__dirname, '/totalsEPL.json')

    const rawMatches = fs.readFileSync(matchesPath, (error, data) => {
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

        // Pull the sites
        matchObj.sites.forEach(siteObj => {
            console.log('MATCH OBJ ======================== ', siteObj);

            Site.findOne({
                where: {
                    key: siteObj.site_key
                }
            })
            .then(siteRes => {
                if (!siteRes) {

                    // console.log('SITE KEY ================', siteObj.site_key);
                    // console.log('SITE NAME ================', siteObj.site_nice);

                    const site = new Site({
                        key: siteObj.site_key,
                        name: siteObj.site_nice
                    });

                    return site.save();
                }
            })
            .catch(err => {
                // console.log('Error status', err);
                // return new Error(err);
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

                return match.save()
            }
        })
        .catch(err => {
            console.log('Error status', err);
            return new Error(err);
        });
        

    });
}

module.exports = { pullMatchesOdds, getMatchesOdds };