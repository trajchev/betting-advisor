const mysql = require('mysql2');

const connect = require('../../connection-data');

const pool = mysql.createPool(connect);

// Fetch data from MySQL
let records = [];
let getData = value => {
    records = value;
    return records;
}

// Handle single ticket
exports.getTicket = (req, res, next) => {
    const ticket = req.body;
    console.log(ticket);
    res.status(201).json(ticket);
}

// Handle delete ticket
exports.deleteTicket = (req, res, next) => {
    console.log(req.params.id);
    pool.query("DELETE * FROM tickets WHERE id = " +  req.params.id, (err, rows, fields)=> {
        if(err) {
            throw err;
        } else { 
            getData(rows);
        }
    });
    res.status(200).json({message: "ticket deleted"});
}

// Handle single ticket view route
exports.getTicketById = (res, req, next) => {
    console.log(req.params.id);
    res.status(200).json({message: "ticket updated"});
}

// Get all tickets
exports.getTickets = (req, res, next)=> {
    pool.query("SELECT * FROM tickets", (err, rows, fields)=> {
        if(err) {
            throw err;
        } else { 
            getData(rows);
        }
    });
    res.status(200)
    .json(records);
}