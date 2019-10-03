const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const routes = require('./routes/routes');

const userRoutes = routes.user;
const leagueRoutes = routes.league;
const matchRoutes = routes.match;
const cronJob = require('./utils/cron');

const app = express();

// Use helmet for setting basic security headers
app.use(helmet());

// Set up heaqders for allowing requests from API CONSUMER (me :) )
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

// Execute defined cron jobs
cronJob.sports;
// cronJob.matches;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/user', userRoutes);
app.use('/api/data', leagueRoutes);
app.use('/api/match', matchRoutes);


module.exports = app;