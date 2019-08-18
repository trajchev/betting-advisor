const axios = require('axios');
const _ = require('underscore');

const Site = require('../models/site');
const connData = require('../../connection-data');

const apiKey = connData.apiKey;
const apiURL = connData.apiURL;

const sites = [];

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