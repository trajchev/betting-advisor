const league = require('./league/league.controller');
const site = require('./site/site.controller');
const team = require('./team/team.controller');
const match = require('./match/match.controller');
const user = require('./users/user.controller');
const auth = require('./auth/authController');
const faq = require('./faq/faq.controller');
const home = require('./home/home.controller');
const saveMatch = require('./savedmatch/savedmatch.controller').saveMatch;
const deleteMatch = require('./savedmatch/savedmatch.controller').deleteMatch;

module.exports = { league, match, user, auth, saveMatch, deleteMatch, site, team, faq, home};