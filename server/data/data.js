const sport = require('./sport/sport.data');
const match = require('./match/match.data');

const getSports = sport.getSports;
const pullSports = sport.pullSports;

module.exports = {
    getSports,
    pullSports,
    match
}