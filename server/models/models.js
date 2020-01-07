const Sport = require('./sport/sport.model');
const Match = require('./match/match.model');
const User = require('./user/user.model');
const SavedMatch = require('./savedmatch/savedmatch.model');
const Team = require('./team/team.model');
const Site = require('./site/site.model');
const Totals = require('./odd/totals.model');
const Spreads = require('./odd/spreads.model');
const H2H = require('./odd/h2h.model');
const Recruits = require('./recruits/recruits.model');
const FAQ = require('./faq/faq.model');
const Ticket = require('./ticket/ticket.model');
const Match2Ticket = require('./match2ticket/match2ticket.model');

// Defining the relationships
Sport.hasMany(Match);
User.hasMany(Ticket);
Match2Ticket.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'});
Match2Ticket.belongsTo(Ticket, {foreignKey: 'ticket_id', targetKey: 'id'});
Match2Ticket.hasMany(SavedMatch);
Ticket.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'});
Sport.hasMany(Team);
Match.belongsTo(Sport, {foreignKey: 'sport_key', targetKey: 'key'});
SavedMatch.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});
SavedMatch.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'});
Team.belongsTo(Sport, {foreignKey: 'sport_key', targetKey: 'key'});
Recruits.belongsTo(User, {foreignKey: 'recruiterId', targetKey: 'id'});
Recruits.belongsTo(User, {foreignKey: 'recruitId', targetKey: 'id'});

// Odd types relationships
Match.hasMany(Totals);
Match.hasMany(Spreads);
Match.hasMany(H2H);
Site.hasMany(Totals);
Site.hasMany(Spreads);
Site.hasMany(H2H);
Totals.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});
Totals.belongsTo(Site, {foreignKey: 'site_id', targetKey: 'id'});
Spreads.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});
Spreads.belongsTo(Site, {foreignKey: 'site_id', targetKey: 'id'});
H2H.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});
H2H.belongsTo(Site, {foreignKey: 'site_id', targetKey: 'id'});

module.exports = { 
    Sport,
    Team,
    Match,
    Site,
    Totals,
    FAQ,
    H2H,
    Spreads,
    User,
    SavedMatch,
    Recruits,
    Ticket,
    Match2Ticket
};