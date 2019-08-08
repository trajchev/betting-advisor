const Sequilize = require('sequelize');

const sequelize = require('../utils/db');

const Ticket = sequelize.define(
    'ticket', {
        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        team_home: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        team_away: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        team_home_odds: {
            type: Sequilize.DECIMAL,
            allowNull: false
        },
        team_away_odds: {
            type: Sequilize.DECIMAL,
            allowNull: false
        },
        game_field: {
            type: Sequilize.STRING,
            allowNull: false
        },
        game_location: {
            type: Sequilize.STRING,
            allowNull: false
        },
        game_time: {
            type: Sequilize.STRING,
            allowNull: false
        }
    }     
);

module.exports = Ticket;