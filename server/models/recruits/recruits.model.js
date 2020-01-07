const Sequilize = require('sequelize');

const sequelize = require('../../utils/db');

class Recruits extends Sequilize.Model {}
// Create the match model using the sequelize package
Recruits.init({
    recruiter_id: {
        type: Sequilize.INTEGER,
        allowNull: false,
    },
    recruit_id: {
        type: Sequilize.INTEGER,
        unique: true,
        allowNull: false,
    },
}, {sequelize, underscored: true, modelName: 'recruits'});

module.exports = Recruits;