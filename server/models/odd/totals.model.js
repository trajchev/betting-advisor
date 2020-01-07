const Sequilize = require('sequelize');
const sequelize = require('../../utils/db');

class Total extends Sequilize.Model {}
// Create the sport model using the sequelize package
Total.init(
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
        position_over: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        position_under: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        odds_home: {
            type: Sequilize.DOUBLE(10, 2),
            allowNull: false,
        },
        odds_away: {
            type: Sequilize.DOUBLE(10, 2),
            allowNull: false,
        },
        points_home: {
            type: Sequilize.DOUBLE(10, 2),
            allowNull: false,
        },
        points_away: {
            type: Sequilize.DOUBLE(10, 2),
            allowNull: false,
        },
        match_id: {
            type: Sequilize.INTEGER,
            allowNull: false,
        },
        site_id: {
            type: Sequilize.INTEGER,
            allowNull: false
        }
    },
{underscored: true, sequelize, modelName: 'total'});

module.exports = Total;
