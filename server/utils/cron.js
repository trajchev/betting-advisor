const cron = require('node-cron');

const controllers = require('../controllers/controllers');
const models = require('../models/models');

const Sport = models.Sport;
const sportController = controllers.sport;
const matchController = controllers.match.getMatchesOdds;

// Check for sports every 28th of the month at 23:59
module.exports.sports = cron.schedule("00 59 23 28 * *", () => {
    sportController()
});
// sportController()

const regions = ['uk', 'us', 'au'];
const mkt = ['h2h', 'spreads', 'totals'];
// Fill matches data every sunday at 23::59
module.exports.matches = cron.schedule("00 59 23 28 * Sunday", () => {

    Sport.findAll()
    .then(sports => {
        sports.forEach(sport => {
            for (let i = 0; i < regions.length; i++) {
                for (let j = 0; j < mkt.length; j++) {
                    matchController(sport.key, regions[i], mkt[j]);
                }
            }
        })
    });

    Sport.findAll()
    .then(sports => {
        sports.forEach(sport => {
            // for (let i = 0; i < regions.length; i++) {
                // for (let j = 0; j < mkt.length; j++) {
                    matchController(sport.key, regions[0], mkt[0]);
                // }
            // }
        })
    });

});