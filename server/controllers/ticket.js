const Ticket = require('../models/ticket');

// Get all tickets
exports.getTickets = (req, res, next) => {
    Ticket.findAll().then(tickets => {
        res.status(200)
        .json(tickets);
    })
    .catch(err => console.log(err));
}

// Get single ticket
exports.getTicket = (req, res, next) => {
    const id = req.body.id;
    Ticket.fetchOne(id)
        .then(([ticket]) => {
            // console.log(tucket);
        })
        .catch(err => console.log(err));
}