const Sequilize = require('sequelize');

const sequelize = require('../../utils/db');

// Create the user model using the sequelize package
const User = sequelize.define( 'user', {
        id: {
            type: Sequilize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequilize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [4, 24],
                isAlphaNumeric: true
            }
        },
        email: {
            type: Sequilize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        photo: {
            type: Sequilize.STRING,
            allowNull: false,
            defaultValue: 'image.jpg'
        },
        role: {
            type: Sequilize.STRING,
            allowNull: false,
            validate: {
                isIn: [['beginner', 'advanced', 'pro', 'admin']]
            },
            defaultValue: 'beginner'
        },
        password: {
            type: Sequilize.STRING,
            allowNull: false,
            validate: {
                len: [8, 24]
            }
        },
        passwordConfirm: {
            type: Sequilize.STRING,
            allowNull: false,
            validate: {
                equals: this.password
            }
        },
        passwordResetToken: {
            type: Sequilize.STRING
        },
        passwordResetToken: {
            type: Sequilize.STRING
        },
        passwordResetExpires: {
            type: Sequilize.DATE
        },
        active: {
            type: Sequilize.BOOLEAN,
            defaultValue: true
        }
    }     
);

module.exports = User;