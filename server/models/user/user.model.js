const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Sequilize = require('sequelize');

const sequelize = require('../../utils/db');

class User extends Sequilize.Model {} 

// Create the user model using the sequelize package
User.init({
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
                len: [4, 24]
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
            defaultValue: 'image.jpg'
        },
        role: {
            type: Sequilize.ENUM,
            allowNull: false,
            values: ['beginner', 'advanced', 'pro', 'admin'],
            defaultValue: 'beginner'
        },
        password: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        passwordConfirm: {
            type: Sequilize.STRING
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
    }, {
        underscored: true,
        sequelize,
        modelName: 'user'
    }     
);

User.addHook('beforeSave', async (user, options) => {

    user.password = await bcrypt.hash(user.password, 10);
    user.passwordConfirm = undefined;

});

User.addHook('beforeSave', user => {

    user.passwordChangedAt = Date.now() - 1000;
    
});

User.prototype.correctPassword = async (candidatePass, userPass) => {
    return await bcrypt.compare(candidatePass, userPass);
}

User.prototype.changedPassAfter = function(JWTTimestamp) {

    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    // Not changed
    return false;
}

User.prototype.createPasswordResetToken = function() {

    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;

}

module.exports = User;