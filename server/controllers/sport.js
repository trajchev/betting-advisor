const axios = require('axios');

const Sport = require('../models/sport');
const connData = require('../../connection-data');

const apiKey = connData.apiKey;
const apiURL = connData.apiURL;

module.exports.fillSportsData = (req, res, next) => {

    axios.get(`${apiURL}sports`, {
        params: {
            api_key: apiKey
        }
    })
    .then(response => {
        console.log('Successfully got response', response.data.data);
        response.data.data.forEach(dataObj => {
            const sport = new Sport({
                key: dataObj.key,
                active: dataObj.active,
                group: dataObj.group,
                details: dataObj.details,
                title: dataObj.details
            });

            return sport.save();
        })
    
    })
    .catch(err => {
        console.log('Error status', error.response.status);
        console.log(error.response.data);
    });

}

// Get all sports
exports.getSports = (req, res, next) => {
    Sport.findAll().then(sport => {
        res.status(200)
        .json(sport);
    })
    .catch(err => console.log(err));
}