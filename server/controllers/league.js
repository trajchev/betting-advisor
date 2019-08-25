const APIData = require('../models/APIData');

const Sport = APIData.Sport;

module.exports = (req, res, next) => {

    Sport.findAll()
    .then(response => {
        res.json(response);
    })
    .catch(err => {
        console.log('Error status', err.response.status);
        console.log(error.response.data);
    });
};