const axios = require('axios');

const models = require('../../models/models');

const Match = models.Match;
const Odd = models.Odd;

const getMatchesOdds = (sport, region, oddsType) => {
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
}

const getMatchesFromDB = (req, res, next) => {
    const league = req.params.league;
    // Grab all the Matches from the sport
    Match.findAll({ where: { sport_key: league }}).then(matches => {
        // check if sport exists
        if (!matches) {
            const error = new Error('The sport key could not be found');
            error.statusCode = 401;
            throw error;
        }
        // compare the 
        res.status(200).json({
            message: 'success',
            matches: matches.length,
            data: matches
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

const getMatchStats = (req, res, next) => {
    const league = req.params.league;
    const matchId = req.params.matchId;
    let game;
    // Grab all the Matches from the sport
    Match.findOne({ where: { id: matchId, sport_key: league }})
    .then(match => {
        // check if sport exists
        if (!match) {
            const error = new Error('The sport key could not be found');
            error.statusCode = 401;
            throw error;
        }

        game = match;
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

    Odd.findAll({where: {match_id: matchId}})
    .then( odds => {
        res.status(200).json({
            message: 'success',
            data: {
                game: game,
                oddsNumber: odds.length,
                odds: odds
            }
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

module.exports = { getMatchesOdds, getMatchesFromDB, getMatchStats};