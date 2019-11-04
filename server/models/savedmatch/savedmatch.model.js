const Sequilize = require('sequelize');

const sequelize = require('../../utils/db');

class SavedMatch extends Sequilize.Model {}
// Create the match model using the sequelize package
SavedMatch.init({
    userId: {
        type: Sequilize.INTEGER,
        allowNull: false,
    },
    matchId: {
        type: Sequilize.INTEGER,
        allowNull: false,
    },
}, {underscored: true, sequelize, modelName: 'savedMatch'});

module.exports = SavedMatch;