const Sequilize = require('sequelize');
const sequelize = require('../../utils/db');

class Odd extends Sequilize.Model {}
// Create the sport model using the sequelize package
Odd.init(
    {
        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        home_team: {
            type: Sequilize.DOUBLE(10, 2),
            allowNull: false,
        },
        draw: {
            type: Sequilize.DOUBLE(10, 2),
            allowNull: false,
        },
        away_team: {
            type: Sequilize.DOUBLE(10, 2),
            allowNull: false,
        },
        match_id: {
            type: Sequilize.INTEGER,
            allowNull: false,
        },
    },
{underscored: true, sequelize, modelName: 'odd'});

module.exports = Odd;
