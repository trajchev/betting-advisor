const axios = require('axios');

const models = require('../../models/models');

const Sport = models.Sport;

// IMPORT Sports data into DB
const importSports = async () => {
    try {

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

        console.log('Data successfully loaded!');

    } catch (err) {

      console.log(err);

    }

    process.exit();
};

importSports();

module.exports = importSports;