const models = require('../../models/models');

const Sport = models.Sport;

const getLeagues = (req, res) => {

    Sport.findAll()
    .then(response => {
        res.json({
            status: 'success',
            leagues: response.length,
            data: response
        });
    })
    .catch(err => {
        console.log('Error status', err.response.status);
        console.log(error.response.data);
    });
};

const getLeaguesOfGroup = (req, res) => {
    const group = req.params.group;

    Sport.findAll({where: {group}})
    .then(response => {
        res.json({
            status: 'success',
            leagues: response.length,
            data: response
        });
    })
    .catch(err => {
        console.log('Error status', err.response.status);
        console.log(error.response.data);
    });
}

module.exports = {
    getLeagues,
    getLeaguesOfGroup
}