const Sequilize = require('sequelize');
const sequelize = require('../../utils/db');

class H2H extends Sequilize.Model {}
// Create the sport model using the sequelize package
H2H.init(
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
        odds_home: {
            type: Sequilize.DOUBLE(10, 2),
            allowNull: false,
        },
        odds_draw: {
            type: Sequilize.DOUBLE(10, 2),
            allowNull: false,
        },
        odds_away: {
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
{underscored: true, freezeTableName: true, sequelize, modelName: 'h2h'});

module.exports = H2H;
