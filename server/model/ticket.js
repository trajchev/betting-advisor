const express = require('express');
const mysql = require('mysql2');
const connect = require('../../connection-data');

const app = express();

let tickets = [];

const pool = mysql.createPool(connect);
const selectQuery = "SELECT * FROM tickets";

async function getTickets() {
    const promisePool = pool.promise();
    const [rows,fields] = await promisePool.query(selectQuery);
    console.log(rows);
    return rows;
}

module.exports = app.get('/tickets', (req, res)=> {
    res.json(tickets);
});