const Sequilize = require('sequelize');

const sequelize = require('../utils/db');

class Sport extends Sequilize.Model {}
// Create the sport model using the sequelize package
Sport.init({
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    key: {
        type: Sequilize.STRING,
        allowNull: false,
        unique: true
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
}, {underscored: true, sequelize, modelName: 'sport'});



class Match extends Sequilize.Model {}
// Create the match model using the sequelize package
Match.init({
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    home_team: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    away_team: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    commence_time: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    sport_key: {
        type: Sequilize.STRING,
        allowNull: false,
    },
}, {underscored: true, sequelize, modelName: 'match'});

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
    }, {underscored: true, sequelize, modelName: 'odd'}
);

Sport.hasMany(Match);
Match.hasMany(Odd);
Match.belongsTo(Sport, {foreignKey: 'sport_id', targetKey: 'id'});
Odd.belongsTo(Match, {foreignKey: 'match_id', targetKey: 'id'});

module.exports = {Sport, Match, Odd };