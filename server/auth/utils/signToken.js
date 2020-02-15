const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id: id, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.JWT_SECRET);
};

module.exports = signToken;