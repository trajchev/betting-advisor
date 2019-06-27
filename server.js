const express = require('express');
const mysql = require('mysql2');

const connect = require('./connection-data');

const app = express();

let tickets = [];

const pool = mysql.createPool(connect);

pool.query("SELECT * FROM tickets", (err, rows, fields)=> {
    if(err) {
        throw err;
    } else { 
        getTickets(rows);
    }
});

let getTickets = value => {
    tickets = value;
    return tickets;
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/tickets', (req, res)=> {
    res.json(tickets);
});

const port = 3000;

app.listen(port, ()=> {
    console.log('Server is running');
});