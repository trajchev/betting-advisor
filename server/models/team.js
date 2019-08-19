const Sequilize = require('sequelize');

const sequelize = require('../utils/db');
const Sport = require('./sport');

// Create the sport model using the sequelize package
const Team = sequelize.define( 'team', {
        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequilize.STRING,
            unique: true,
            allowNull: false
        },
        league_key: {
            type: Sequilize.STRING,
            allowNull: false
        }
    }
);

module.exports = Team;