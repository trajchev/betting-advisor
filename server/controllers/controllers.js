const league = require('./league/league.controller');
const match = require('./match/match.controller');
const user = require('./users/user.controller');
const auth = require('./auth/authController');

module.exports = { league, match, user, auth };