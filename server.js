const app = require('./server/app');
const sequelize = require('./server/utils/db');
const cronJob = require('./server/utils/cron');

// Set the port number to one given by the hosting provider or default to 3000
const port = process.env.PORT || 3000;

app.set('port', port);

// Execute defined cron jobs
cronJob.sports;
cronJob.matches;

sequelize.sync()
    .then(result => {
        // console.log(result);
        app.listen(port);
    })
    .catch(err => {
        console.log(err)
    });