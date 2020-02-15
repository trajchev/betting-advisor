const signup = require('./signup/signup');
const login = require('./login/login');
const logout = require('./logout/logout');
const protect = require('./protect/protect');
const restrictTo = require('./restrict/restrict');
const forgotPassword = require('./forgotPassword/forgotPassword');
const resetPassword = require('./resetPassword/resetPassword');
const updatePassword = require('./updatePassword/updatePassword');

module.exports = {

    signup,
    login,
    logout,
    protect,
    restrictTo,
    forgotPassword,
    resetPassword,
    updatePassword
    
};