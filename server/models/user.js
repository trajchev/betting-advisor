const Sequilize = require('sequelize');

const sequelize = require('../utils/db');

const User = sequelize.define(
    'user', {
        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequilize.STRING,
            allowNull: false,
        }
    }     
);

module.exports = User;