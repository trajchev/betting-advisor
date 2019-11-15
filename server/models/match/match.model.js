const Sequilize = require('sequelize');

const sequelize = require('../../utils/db');

class Match extends Sequilize.Model {}
// Create the match model using the sequelize package
Match.init({
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    home_team: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    away_team: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    commence_time: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    sport_key: {
        type: Sequilize.STRING,
        allowNull: false,
    },
}, {underscored: true, sequelize, modelName: 'match'});

module.exports = Match;