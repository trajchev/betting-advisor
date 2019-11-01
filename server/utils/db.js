const Sequelize = require('sequelize');

// connect to db with sequelize
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASS,
    {
        host: 'localhost',
        dialect: 'mysql',
        // disable logging
        // logging: false    
    }
);

module.exports = sequelize;