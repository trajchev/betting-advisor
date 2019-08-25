const axios = require('axios');

const APIData = require('../models/APIData');
const connData = require('../../connection-data');

const apiKey = connData.apiKey;
const apiURL = connData.apiURL;
const Match = APIData.Match;
const Odd = APIData.Odd;

module.exports = (req, res, next) => {
    axios.get(`${apiURL}odds`, {
        params: {
            api_key: apiKey,
            sport: req.body.sport,
            region: req.body.region,
        }
    })
    .then(response => {
        response.data.data.forEach(dataObj => {
            // Create the Match and save to db
            const match = new Match({
                home_team: dataObj.teams[0],
                away_team: dataObj.teams[1],
                commence_time: dataObj.commence_time,
                sport_key: dataObj.sport_key,
            });

            return match.save()
            .then(matchData => {
                dataObj.sites.forEach(site => {
                    // Create odd and save to db
                    const type = Object.keys(site.odds)[0];
                    const oddsArr = site.odds[type];
                    const odd = new Odd({
                        type: type,
                        home_team: oddsArr[0],
                        draw: oddsArr[1],
                        away_team: oddsArr[2],
                        match_id: matchData.dataValues.id
                    });
        
                    return odd.save()
                });
            });
        })
    
    })
    .catch(err => {
        console.log('Error status', err.response.status);
        console.log(err.response.data);
    });
};