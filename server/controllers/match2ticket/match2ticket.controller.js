const catchAsync = require('../../utils/catchAsync');
const factory = require('../../helpers/helper');
const BAError = require('../../utils/BAError');
const models = require('../../models/models');

const Match2Ticket = models.Match2Ticket;

const match2ticket = catchAsync(async (req, res, next) => {

    const user_id = +req.user.id;

    const match2ticket = await Match2Ticket.create({
        user_id, 
        ticket_id: req.body.ticket_id, 
        saved_match_id: req.body.saved_match_id
    });

    if (!match2ticket) {
        return next(new BAError('The document could not be created', 404));
    }

    res.status(201).json({
        status: 'success',
        data: match2ticket
    });

});

const removeMatchFromTicket = factory.deleteOne(Match2Ticket);

module.exports = {

    match2ticket,
    removeMatchFromTicket

}