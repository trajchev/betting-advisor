const Sport = require('./sport/sport.model');
const Match = require('./match/match.model');
const Odd = require('./odd/odd.model');
const User = require('./user/user.model');
const SavedMatch = require('./savedmatch/savedmatch.model');
const Site = require('./site/site.model');
const Totals = require('./odd/totals.model');
const Team = require('./team/team.model');

// Defining the relationships
Sport.hasMany(Match);
Sport.hasMany(Team);
Match.hasMany(Odd);
Match.belongsTo(Sport, {foreignKey: 'sport_key', targetKey: 'key'});
Odd.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});

Team.belongsTo(Sport, {foreignKey: 'sport_key', targetKey: 'key'});

Odd.belongsTo(Site, {foreignKey: 'site_id', targetKey: 'id'});
Totals.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});
Totals.belongsTo(Site, {foreignKey: 'site_id', targetKey: 'id'});
SavedMatch.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});
SavedMatch.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'});


module.exports = { 
    Sport,
    Team,
    Match,
    Odd,
    Site,
    Totals,
    User,
    SavedMatch
};