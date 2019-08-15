const Sequilize = require('sequelize');

const sequelize = require('../utils/db');

// Create the sport model using the sequelize package
const Sport = sequelize.define( 'sport', {
        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        key: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        active: {
            type: Sequilize.BOOLEAN,
            allowNull: false,
        },
        group: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        details: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        title: {
            type: Sequilize.STRING,
            allowNull: false
        }
    }     
);

module.exports = Sport;