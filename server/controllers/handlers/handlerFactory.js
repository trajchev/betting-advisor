const catchAsync = require('../../utils/catchAsync');
const BAError = require('../../utils/BAError');

const deleteOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.destroy({where: {id: req.params.id}});

    if (!doc) {
        return next(new BAError('No document found with that id', 404));
    }

    res.status(204).json({
        status: 'success'
    });

});

const updateOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.update(req.body, {
        where: {
            id: req.params.id
        }
    })

    if (!doc) {
        return next(new BAError('No document with that ID found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

const createOne = Model => catchAsync(async (req, res, next) => {

    const doc = new Model(req.body).save();

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

const createOneAssoc = Model => catchAsync(async (req, res, next) => {

    const userId = +req.user.id;
    const docId = +req.body.docId;

    const doc = await Model.create({userId, matchId: docId});

    if (!doc) {
        return next(new BAError('The document could not be created', 404));
    }

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });


})

const getOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findOne({where: {id: req.params.id}});

    if (!doc) { return next(new BAError('No Document found with that id', 404));}

    if (doc.password) {
        const photo = doc.photo;
        doc.password = '';
        doc.photo = `http://localhost:3300/img/users/${photo}`;
    }

    res.status(200).json({
        status: 'success',
        data: doc
    });
});

const getOneAssoc = (Model, AssocModel, assocAlias) => catchAsync( async(req, res, next) => {

    const doc = await Model.findOne({ where: { id: req.params.id }, include: [{model: AssocModel, as: assocAlias}]});

    if (!doc) { return next(new BAError('No Document found with that id', 404));}

    res.status(200).json({
        status: 'success',
        data: doc
    });

});

const getAll = Model => catchAsync(async (req, res, next) => {

    let limit, page = 1, offset;

    if (req.params.page) {
        limit = +req.params.perPage;
        page = +req.params.page;
        offset = (page - 1) * limit;
    } 

    // To allow for nested GET reviews on ticket
    let filter = {};

    if (req.params.ticketId) filter = { ticket: req.params.ticketId };
    if (req.params.group) { filter.group = req.params.group };
    if (req.params.league) { filter.sport_key = req.params.league };

    const occurences = await Model.count({where: filter});
    const doc = await Model.findAll({limit, offset, where: filter});

    res.status(200).json({
        status: 'success',
        stats: {
            records: occurences,
            perpage: limit,
            current: doc.length,
            offset: offset
        },
        data: doc
    });
});

module.exports = {
    createOne,
    createOneAssoc,
    getOne,
    getOneAssoc,
    getAll,
    updateOne,
    deleteOne,
}