const models = require('../../models/models');

const Match = models.Match;
const Odd = models.Odd;

const getMatches = (req, res, next) => {
    const league = req.params.league;
    // Grab all the Matches from the sport
    Match.findAll({ where: { sport_key: league }})
    .then(matches => {
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
    // Grab the match with given ID
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

module.exports = { getMatches, getMatchStats};