const Sequilize = require('sequelize');

const sequelize = require('../../utils/db');

class Recruits extends Sequilize.Model {}
// Create the match model using the sequelize package
Recruits.init({
    recruiterId: {
        type: Sequilize.INTEGER,
        allowNull: false,
    },
    recruitId: {
        type: Sequilize.INTEGER,
        unique: true,
        allowNull: false,
    },
}, {sequelize, underscored: true, modelName: 'recruits'});

module.exports = Recruits;