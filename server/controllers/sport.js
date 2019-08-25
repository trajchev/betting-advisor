const axios = require('axios');

const APIData = require('../models/APIData');
const connData = require('../../connection-data');

const apiKey = connData.apiKey;
const apiURL = connData.apiURL;
const Sport = APIData.Sport;

module.exports = (req, res, next) => {

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
                title: dataObj.title,
            });

            return sport.save();
        })
    
    })
    .catch(err => {
        console.log('Error status', err.response.status);
        console.log(error.response.data);
    });
};