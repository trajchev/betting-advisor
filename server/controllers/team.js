// const axios = require('axios');
// const _ = require('underscore');

// const Team = require('../models/team');
// const connData = require('../../connection-data');

// const apiKey = connData.apiKey;
// const apiURL = connData.apiURL;

// module.exports.fillSitesData = (req, res, next) => {

//     axios.get(`${apiURL}odds`, {
//         params: {
//             api_key: apiKey,
//             sport: req.body.sport_key,
//             region: req.body.region,
//             mkt: req.body.mkt
//         }
//     })
//     .then(response => {
//         // Loop through the ticket Objects
//         _.each(response.data.data, dataObj => {
//             console.log(dataObj.teams)
//             // const home_team = new Team({
//             //     name: dataObj.teams[0],
//             //     league_key: dataObj.sport_key
//             // });
//             // home_team.save();

//             // const away_team = new Team({
//             //     name: dataObj.teams[1],
//             //     league_key: dataObj.sport_key
//             // });
//             // away_team.save();
           
//         });
//     })
//     .catch(err => {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//         }
//         res.status(500).json({error: err});
//         next(err);
//     });

// }