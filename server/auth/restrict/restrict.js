const BAError = require('../../utils/BAError');

const restrictTo = (...roles) => {

    return (req, res, next) => {
        // roles is an array
        if(!roles.includes(req.user.role)) {
            return next(new BAError('You do not have a permission to perform this action', 403))
        }

        next();
    }

}

module.exports = restrictTo;