const league = require('./league/league.controller');
const site = require('./site/site.controller');
const team = require('./team/team.controller');
const match = require('./match/match.controller');
const user = require('./users/user.controller');
const faq = require('./faq/faq.controller');
const home = require('./home/home.controller');
const saveMatch = require('./savedmatch/savedmatch.controller').saveMatch;
const deleteMatch = require('./savedmatch/savedmatch.controller').deleteMatch;
const ticket = require('./ticket/ticket.controller');
const match2ticket = require('./match2ticket/match2ticket.controller');

module.exports = { league, match, user, saveMatch, deleteMatch, site, team, faq, home, ticket, match2ticket};