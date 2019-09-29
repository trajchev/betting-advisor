const axios = require('axios');

const models = require('../../models/models');
const connData = require('../../../connection-data');

const apiKey = connData.apiKey;
const apiURL = connData.apiURL;
const Sport = models.Sport;

module.exports = (req, res, next) => {

    axios.get(`${apiURL}sports`, {
        params: {
            api_key: apiKey
        }
    })
    .then(response => {
        response.data.data.forEach(dataObj => {
            Sport.findOne({where: {key: dataObj.key}})
            .then(sportResult => {
                if (!sportResult) {

                    const sport = new Sport({
                        key: dataObj.key,
                        active: dataObj.active,
                        group: dataObj.group,
                        details: dataObj.details,
                        title: dataObj.title,
                    });

                    return sport.save();

                }
            })
        })
    
    })
    .catch(err => {
        console.log('Error status', err.response.status);
        console.log(error.response.data);
    });
};