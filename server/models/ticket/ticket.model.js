const Sequilize = require('sequelize');

const sequelize = require('../../utils/db');

class Ticket extends Sequilize.Model {}
// Create the match model using the sequelize package
Ticket.init({
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequilize.STRING,
        defaultValue: 'Ticket ' + Date.now().toString()
    },
    user_id: {
        type: Sequilize.INTEGER,
        allowNull: false,
    }
}, {sequelize, underscored: true, modelName: 'ticket'});

module.exports = Ticket;