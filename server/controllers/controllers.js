const league = require('./league/league.controller');
const match = require('./match/match.controller');
const sport = require('./sport/sport.controller');
const user = require('./users/user.controller');
const auth = require('./auth/authController');

module.exports = { league, match, sport, user, auth };