const express = require('express');

const app = express();


// Set up heaqders for allowing requests from localhost 4200 (Angular)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

module.exports = app;