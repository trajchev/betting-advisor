const factory = require('../handlers/handlerFactory');
const models = require('../../models/models');

const Ticket = models.Ticket;
const Match2Ticket = models.Match2Ticket;

const createTicket = factory.createUserAsset(Ticket);
const deleteTicket = factory.deleteOne(Ticket);
const getTicket = factory.getOneAssoc(Ticket, Match2Ticket, 'match2tickets');
const getTickets = factory.getAll(Ticket);
const updateTicket = factory.updateOne(Ticket);

module.exports = {

    createTicket,
    deleteTicket,
    getTicket,
    getTickets,
    updateTicket

};