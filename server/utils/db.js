const Sequelize = require('sequelize');

const connect = require('../../connection-data');

const sequelize = new Sequelize(connect.db, connect.user, connect.pass, {host: 'localhost', dialect: 'mysql'});

module.exports = sequelize;