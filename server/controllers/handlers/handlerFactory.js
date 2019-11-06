const catchAsync = require('../../utils/catchAsync');
const BAError = require('../../utils/BAError');
const APIFeatures = require('../../utils/ApiFeatures');

const deleteOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.destroy({where: {id: req.params.id}});

    if (!doc) {
        return next(new BAError('No document found with that id', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
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

const getOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findOne({where: {id: req.params.id}});

    if (!doc) { return next(new BAError('No Document found with that id', 404));}

    if (doc.password) {
        doc.password = '';
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

const getAll = (Model) => catchAsync(async (req, res, next) => {

    let limit, page, offset;

    if (req.params.page) {
        limit = 10;
        page = +req.params.page;
        offset = (page - 1) * limit;
    } 

    // To allow for nested GET reviews on tour
    let filter = {};

    if (req.params.ticketId) filter = { ticket: req.params.ticketId };
    if (req.params.group) { filter.group = req.params.group };

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
        data: {
            data: doc
        }
    });
});

module.exports = {
    createOne,
    getOne,
    getAll,
    updateOne,
    deleteOne
}