const FAQ = require('./faq/faq.model');

const User = require('./user/user.model');
const Recruits = require('./recruits/recruits.model');

const Site = require('./site/site.model');

const H2H = require('./odd/h2h.model');
const Totals = require('./odd/totals.model');
const Spreads = require('./odd/spreads.model');

const Sport = require('./sport/sport.model');
const Team = require('./team/team.model');
const Match = require('./match/match.model');
const Ticket = require('./ticket/ticket.model');
const Match2Ticket = require('./match2ticket/match2ticket.model');

// Defining the relationships
Sport.hasMany(Match);
Sport.hasMany(Team);
User.hasMany(Ticket);
Ticket.hasMany(Match2Ticket);

Match2Ticket.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});
Match2Ticket.belongsTo(Ticket, {foreignKey: 'ticket_id', targetKey: 'id'});

Ticket.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'});

Match.belongsTo(Sport, {foreignKey: 'sport_key', targetKey: 'key'});
Team.belongsTo(Sport, {foreignKey: 'sport_key', targetKey: 'key'});
Recruits.belongsTo(User, {foreignKey: 'recruiterId', targetKey: 'id'});
Recruits.belongsTo(User, {foreignKey: 'recruitId', targetKey: 'id'});

// Odd types relationships
Site.hasMany(H2H);
Match.hasMany(H2H);
Site.hasMany(Totals);
Match.hasMany(Totals);
Site.hasMany(Spreads);
Match.hasMany(Spreads);

H2H.belongsTo(Site, {foreignKey: 'site_id', targetKey: 'id'});
H2H.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});
Totals.belongsTo(Site, {foreignKey: 'site_id', targetKey: 'id'});
Totals.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});
Spreads.belongsTo(Site, {foreignKey: 'site_id', targetKey: 'id'});
Spreads.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});

module.exports = {
    
    FAQ,
    User, Recruits,
    Site,
    Sport, Team, Match, Ticket, Match2Ticket,
    H2H, Totals, Spreads,

};