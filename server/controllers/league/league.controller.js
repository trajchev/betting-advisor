const models = require('../../models/models');

const Sport = models.Sport;

module.exports = (req, res) => {

    Sport.findAll()
    .then(response => {
        res.json(response);
    })
    .catch(err => {
        console.log('Error status', err.response.status);
        console.log(error.response.data);
    });
};