const axios = require('axios');
const _ = require('underscore');

const Site = require('../models/site');
const Team = require('../models/team');
const connData = require('../../connection-data');

const apiKey = connData.apiKey;
const apiURL = connData.apiURL;

const sites = [];
const teams = [];

module.exports.fillSitesData = (req, res, next) => {

    axios.get(`${apiURL}odds`, {
        params: {
            api_key: apiKey,
            sport: req.body.sport_key,
            region: req.body.region,
            mkt: req.body.mkt
        }
    })
    .then(response => {
        // Loop through the ticket Objects
        _.each(response.data.data, dataObj => {
            // Save teams
            if (!_.contains(_.pluck(teams, 'name'), dataObj.teams[0])) {
                // Create the home team Object
                const home_team = new Team({
                    name: dataObj.teams[0],
                    league_key: dataObj.sport_key
                });
                // push site to sites for checking purposes only
                teams.push(home_team);
                home_team.save();
            } else if (!_.contains(_.pluck(teams, 'name'), dataObj.teams[1])) {
                // Create the away site Object
                const away_team = new Team({
                    name: dataObj.teams[1],
                    league_key: dataObj.sport_key
                });
                // push site to sites for checking purposes only
                teams.push(away_team);
                away_team.save();
            } else {
                return;
            }

            // Loop through the sites
            _.each(dataObj.sites, siteObj => {
                // Stop executing block of code if sites contains the site
                if (_.contains(_.pluck(sites, 'key'), siteObj.site_key)) {
                    return;
                } else {
                    // Create the site Object
                    const site = new Site({
                        key: siteObj.site_key,
                        name: siteObj.site_nice,
                    });
                    // push site to sites for checking purposes only
                    sites.push(site);
                    return site.save();
                }
            });
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(500).json({error: err});
        next(err);
    });

}

// Get all sports
// exports.getSports = (req, res, next) => {
//     Sport.findAll().then(sport => {
//         res.status(200)
//         .json(sport);
//     })
//     .catch(err => console.log(err));
// }