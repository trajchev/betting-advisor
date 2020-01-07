const Sequilize = require('sequelize');

const sequelize = require('../../utils/db');

class Match2Ticket extends Sequilize.Model {}
// Create the match model using the sequelize package
Match2Ticket.init({
    user_id: {
        type: Sequilize.INTEGER,
        allowNull: false,
    },
    ticket_id: {
        type: Sequilize.INTEGER,
        allowNull: false,
    },
    match_id: {
        type: Sequilize.INTEGER,
        allowNull: false,
    },
}, {sequelize, underscored: true, modelName: 'match2ticket'});

module.exports = Match2Ticket;