const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const connect = require('../../connection-data');

const pool = mysql.createPool(connect);

// Fetch data from MySQL
let records = [];
let getData = value => {
    records = value;
    return records;
}

router.post('/api/ticket', (req, res, next) => {
    const ticket = req.body;
    console.log(ticket);
    res.status(201).json(ticket);
});

router.delete('/:id', (req, res, next) => {
    console.log(req.params.id);
    pool.query("DELETE * FROM tickets WHERE id = " +  req.params.id, (err, rows, fields)=> {
        if(err) {
            throw err;
        } else { 
            getData(rows);
        }
    });
    res.status(200).json({message: "ticket deleted"});
});

router.put('/:id', (res, req, next) => {
    console.log(req.params.id);
    res.status(200).json({message: "ticket updated"});
});

router.get('/api/tickets', (req, res)=> {
    pool.query("SELECT * FROM tickets", (err, rows, fields)=> {
        if(err) {
            throw err;
        } else { 
            getData(rows);
        }
    });
    res.status(200)
    .json(records);
});

module.exports = router;