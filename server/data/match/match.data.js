const axios = require('axios');

const models = require('../../models/models');

const Match = models.Match;
const Odd = models.Odd;

// IMPORT DATA INTO DB
const getMatchesOdds = (league, region) => {
    axios.get(`${process.env.API_URL}odds`, {
        params: {
            api_key: process.env.API_KEY,
            sport: league,
            region: region,
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

            match.save()

            dataObj.sites.forEach(site => {
                // Create odd and save to db
                const type = Object.keys(site.odds)[0];
                const oddsArr = site.odds[type];
                const odd = new Odd({
                    type,
                    home_team: oddsArr[0],
                    draw: oddsArr[1],
                    away_team: oddsArr[2],
                    match_id: matchData.dataValues.id
                });
    
                return odd.save()
            });
        });
    
    })
    .catch(err => {
        console.log('Error status', err.response.status);
        console.log(err.response.data);
    });

    process.exit();
}

module.exports = getMatchesOdds;