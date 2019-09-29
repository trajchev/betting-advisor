const league = require('./league/league.controller');
const match = require('./match/match.controller');
const sport = require('./sport/sport.controller');
const user = require('./users/user.controller');

module.exports = {
    league,
    match,
    sport,
    user
};