const cron = require('node-cron');

const models = require('../models/models');
const data = require('../data/data');

const Sport = models.Sport;
const pullSports = data.pullSports;
const getSports = data.getSports;
const pullMatch = data.pullMatchesOdds;
const getMatch = data.getMatchesOdds;

// Check for sports every 28th of the month at 23:59
module.exports.sports = cron.schedule("00 59 23 28 * *", () => {
    pullSports()
});

// module.exports.sports = pullSports();

const regions = ['uk', 'us', 'au'];
const mkt = ['h2h', 'spreads', 'totals'];
// Fill matches data every sunday at 23::59
module.exports.matches = cron.schedule("00 59 23 28 * Sunday", () => {

    Sport.findAll()
    .then(sports => {
        sports.forEach(sport => {
            for (let i = 0; i < regions.length; i++) {
                for (let j = 0; j < mkt.length; j++) {
                    pullMatch(sport.key, regions[i], mkt[j]);
                }
            }
        })
    });

    Sport.findAll()
    .then(sports => {
        sports.forEach(sport => {
            pullMatch(sport.key, regions[0], mkt[0]);
        })
    });

});

module.exports.getSports = () => {
    return getSports();
};

module.exports.getMatches = () => {
    return getMatch();
}