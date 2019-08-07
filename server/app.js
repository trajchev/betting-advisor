const express = require('express');
const helmet = require('helmet');

const app = express();

// Use helmet for setting basic security headers
app.use(helmet());

// Set up heaqders for allowing requests from localhost 4200 (Angular)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

module.exports = app;