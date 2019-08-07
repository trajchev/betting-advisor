const express = require('express');
const mysql = require('mysql2');
const connect = require('../../connection-data');

const app = express();

let tickets = [];

// Create mysql pool since its more efficient than basic query
const pool = mysql.createPool(connect);
const selectQuery = "SELECT * FROM tickets";

async function getTickets() {
    const promisePool = pool.promise();
    const [rows,fields] = await promisePool.query(selectQuery);
    console.log(rows);
    return rows;
}

// Export the /tickets route with the tickets data as a response on it
module.exports = app.get('/tickets', (req, res)=> {
    res.json(tickets);
});