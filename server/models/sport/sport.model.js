const Sequilize = require('sequelize');

const sequelize = require('../../utils/db');

class Sport extends Sequilize.Model {}

// Create the sport model using the sequelize package
Sport.init({
    key: {
        type: Sequilize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
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
        allowNull: false,
        unique: true
    }
}, {underscored: true, sequelize, modelName: 'sport'});

module.exports = Sport;