const Sequilize = require('sequelize');

const sequelize = require('../../utils/db');

class Site extends Sequilize.Model {}

// Create the sport model using the sequelize package
Site.init({
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    key: {
        type: Sequilize.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequilize.STRING,
        allowNull: false,
        unique: true
    },
    region: {
        type: Sequilize.STRING,
        defaultValue: 'uk'
    }
}, {underscored: true, sequelize, modelName: 'site'});

module.exports = Site;