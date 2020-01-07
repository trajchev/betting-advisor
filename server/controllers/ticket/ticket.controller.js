// const factory = require('../handlers/handlerFactory');
const Ticket = require('../../models/models').Ticket;
const catchAsync = require('../../utils/catchAsync');

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

})

module.exports = {

    createTicket

};