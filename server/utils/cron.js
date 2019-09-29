const cron = require('node-cron');

const controllers = require('../controllers/controllers');

const sportController = controllers.sport;
const matchController = controllers.match;

// Check for sports every 28th of the month at 23:59
module.exports.sports = cron.schedule("00 59 23 28 * *", () => {
    sportController()
});

// Fill matches data every sunday at 23::59
module.exports.matches = cron.schedule("00 59 23 28 * Sunday", () => {
    matchController('mma_mixed_martial_arts');
});