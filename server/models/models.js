const Sport = require('./sport/sport.model');
const Match = require('./match/match.model');
const Odd = require('./odd/odd.model');
const User = require('./user/user.model');
const SavedMatch = require('./savedmatch/savedmatch.model');
const Site = require('./site/site.model');
const Totals = require('./odd/totals.model');

// Defining the relationships
Sport.hasMany(Match);
Match.hasMany(Odd);
Match.belongsTo(Sport, {foreignKey: 'sport_key', targetKey: 'key'});
Odd.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});
Odd.belongsTo(Site, {foreignKey: 'site_id', targetKey: 'id'});
Totals.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});
Totals.belongsTo(Site, {foreignKey: 'site_id', targetKey: 'id'});
SavedMatch.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});
SavedMatch.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'});
module.exports = { Sport, Match, Odd, User, SavedMatch, Site, Totals };