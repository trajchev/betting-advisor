const Sequilize = require('sequelize');
const sequelize = require('../../utils/db');

class FAQ extends Sequilize.Model {}
// Create the sport model using the sequelize package
FAQ.init(
    {
        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        question: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        answer: {
            type: Sequilize.TEXT,
            allowNull: false,
        }
    },
{underscored: true, freezeTableName: true, sequelize, modelName: 'faq'});

module.exports = FAQ;
