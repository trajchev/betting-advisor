const sport = require('./sport/sport.data');
const match = require('./match/match.data');

const getSports = sport.getSports;
const pullSports = sport.pullSports;

const getMatchesOdds = match.getMatchesOdds;
const pullMatchesOdds = match.pullMatchesOdds;

module.exports = {
    getSports,
    pullSports,
    getMatchesOdds,
    pullMatchesOdds
}