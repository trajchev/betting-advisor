const Sequilize = require('sequelize');

const sequelize = require('../utils/db');

// Create the sport model using the sequelize package
const Site = sequelize.define( 'site', {
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
            allowNull: false
        }
    }
);

// Extend model with method 
Site.upsert = (key, name) => {
    const find = {key};
    const create = {key, name};
    return Site.findOrCreate({where: find, defaults: create});
};

module.exports = Site;