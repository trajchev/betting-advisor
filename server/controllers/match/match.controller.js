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
            matchesNumber: matches.length,
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
    // Grab the match with given ID
    Match.findOne({ where: { id: matchId, sport_key: league }, include: [{model: Odd, as: 'odds'}]})
    .then(match => {
        // check if sport exists
        if (!match) {
            const error = new Error('The sport key could not be found');
            error.statusCode = 401;
            throw error;
        }

        res.status(200).json({
            message: 'success',
            oddsNumber: match.odds.length,
            data: {
                game: match
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