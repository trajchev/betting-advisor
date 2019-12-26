const user = require('./user/user.route');
const league = require('./league/league.route');
const match = require('./match/match.route');
const site = require('./site/site.route');
const team = require('./team/team.route');

module.exports =  { user, league, match, site, team };