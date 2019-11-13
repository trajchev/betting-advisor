const models = require('../../models/models');
const catchAsync = require('../../utils/catchAsync');
const BAError = require('../../utils/BAError');

const Match = models.Match;
const Odd = models.Odd;

const getMatches = catchAsync( async(req, res, next) => {
    
    const league = req.params.league;

    // Grab all the Matches from the sport
    const matches = await Match.findAll({ where: { sport_key: league }})

    if (!matches) {
        return next(new BAError('No matches for that league were found', 404));
    }
    
    res.status(200).json({
        message: 'success',
        records: matches.length,
        data: matches
    });

});

const getMatch = catchAsync( async (req, res, next) => {

    const league = req.params.league;
    const matchId = req.params.matchId;

    // Grab the match with given ID
    const match = await Match.findOne({ where: { id: matchId, sport_key: league }, include: [{model: Odd, as: 'odds'}]});

    if (!match) {
        return next(new BAError('No matches in this league with that id was found', 404));
    }
    
    res.status(200).json({
        message: 'success',
        oddsNumber: match.odds.length,
        data: match
    });

});

module.exports = {
    getMatches,
    getMatch
};