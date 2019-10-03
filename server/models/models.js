const Sport = require('./sport/sport.model');
const Match = require('./match/match.model');
const Odd = require('./odd/odd.model');
const User = require('./user/user.model');

// Defining the relationships
Sport.hasMany(Match);
Match.hasMany(Odd);
Match.belongsTo(Sport, {foreignKey: 'sport_key', targetKey: 'key'});
Odd.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});

module.exports = { Sport, Match, Odd, User };