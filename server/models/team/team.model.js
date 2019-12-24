const Sequilize = require('sequelize');

const sequelize = require('../../utils/db');

class Team extends Sequilize.Model {}

// Create the sport model using the sequelize package
Team.init({
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequilize.STRING,
        allowNull: false,
        unique: true
    },
    sport_name: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    sport_key: {
        type: Sequilize.STRING,
        allowNull: false,
    }
}, {underscored: true, sequelize, modelName: 'team'});

module.exports = Team;