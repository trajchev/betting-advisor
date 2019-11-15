const league = require('./league/league.controller');
const match = require('./match/match.controller');
const user = require('./users/user.controller');
const auth = require('./auth/authController');
const saveMatch = require('./savedmatch/savedmatch.controller');

module.exports = { league, match, user, auth, saveMatch};