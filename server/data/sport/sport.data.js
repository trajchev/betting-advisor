const axios = require('axios');
const fs = require('fs');
const path = require('path');

const models = require('../../models/models');

const Sport = models.Sport;

const pullSports = () => {

    axios.get(`${process.env.API_URL}sports`, {
        params: {
            api_key: process.env.API_KEY
        }
    })
    .then(response => {
        response.data.data.forEach(dataObj => {
            Sport.findOne({where: {key: dataObj.key}})
            .then(sportResult => {
                if (!sportResult) {

                    const sport = new Sport({
                        key: dataObj.key,
                        active: dataObj.active || false,
                        group: dataObj.group,
                        details: escape(dataObj.details),
                        title: dataObj.title,
                    });

                    return sport.save();

                }
            })
            .catch(err => {
                console.log('Error status', err);
            });
        })
    
    })
    .catch(err => {
        console.log('Error status', err);
    });
};

const getSports = () => {
    const sportsPath = path.join(__dirname, '/sports.json')
    const rawSports = fs.readFileSync(sportsPath, (error, data) => {
        if (error) {
            return new Error(error);
        }
    });

    const sports = JSON.parse(rawSports);

    sports.data.forEach(sportObj => {
        Sport.findOne({where: {key: sportObj.key}})
        .then(sportResult => {
            if (!sportResult) {

                const sport = new Sport({
                    key: sportObj.key,
                    active: sportObj.active || false,
                    group: sportObj.group,
                    details: sportObj.details.replace(/[^0-9a-z- ]/gi, ''),
                    title: sportObj.title,
                });

                return sport.save();

            }
        })
        .catch(err => {
            console.log('Error status', err);
            return new Error(err);
        });
    });

    // console.log(sports.data);
};

module.exports = { pullSports, getSports };