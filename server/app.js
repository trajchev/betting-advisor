const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const ticketRoutes = require('./routes/tickets');
const userRoutes = require('./routes/user');
const sportRoutes = require('./routes/sport');
const siteRoutes = require('./routes/site');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/user', userRoutes);
app.use('/api/sports', sportRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api', ticketRoutes);

module.exports = app;