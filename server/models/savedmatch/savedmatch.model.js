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
        unique: true,
        allowNull: false,
    },
}, {sequelize, underscored: true, modelName: 'savedMatch'});

module.exports = SavedMatch;