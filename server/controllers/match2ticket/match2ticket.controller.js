const factory = require('../handlers/handlerFactory');
const models = require('../../models/models');

const Match2Ticket = models.Match2Ticket;

const removeMatchFromTicket = factory.deleteOne(Match2Ticket);
const match2ticket = factory.createUserAsset(Match2Ticket);

module.exports = {

    match2ticket,
    removeMatchFromTicket

}