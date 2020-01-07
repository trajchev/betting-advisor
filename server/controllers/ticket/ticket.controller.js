const factory = require('../handlers/handlerFactory');
const models = require('../../models/models');
const catchAsync = require('../../utils/catchAsync');

const Ticket = models.Ticket;
const Match2Ticket = models.Match2Ticket;

const createTicket = catchAsync(async (req, res, next) => {

    const user_id = +req.user.id;

    const ticket = await Ticket.create({user_id, title: req.body.title});

    if (!ticket) {
        return next(new BAError('The ticket could not be created', 404));
    }

    res.status(201).json({
        status: 'success',
        data: ticket
    });

});

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