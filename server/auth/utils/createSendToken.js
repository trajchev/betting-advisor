const signToken = require('./signToken');

const createSendToken = (user, statusCode, req, res) => {

    const token = signToken(user.id);
    const expTime = Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1;

    const tokenOptions = {
        expires: new Date(expTime),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    };

    res.cookie('jwt', token, tokenOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        expiresIn: +process.env.JWT_COOKIE_EXPIRES_IN,
        data: {
            user
        }
    });

}

module.exports = createSendToken;