const catchAsync = require('../../utils/catchAsync');
const BAError = require('../../utils/BAError');
const models = require('../../models/models');

const Site = models.Site;

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
        data: doc
    });

});

const createOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model(req.body).save();

    if ( !doc ) {
        return next(new BAError('The document could not be created', 404));
    }

    res.status(201).json({
        status: 'success',
        message: 'Document created successfully'
    });

});

const createUserAsset = Model => catchAsync(async (req, res, next) => {

    const doc = await new Model({user_id: +req.user.id,  ...req.body}).save();

    if (!doc) {
        return next(new BAError('The document could not be created', 404));
    }

    res.status(201).json({
        status: 'success',
        data: doc
    });

});

const getOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findOne({where: {id: req.params.id}});

    if (!doc) { return next(new BAError('No Document found with that id', 404));}

    if (doc.password) {
        const photo = doc.photo;
        doc.password = undefined;
        doc.passwordConfirm = undefined;
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

const getAssocSite = (Model, AssocModel, assocAlias) => catchAsync( async(req, res, next) => {

    let regionCondition = {};

    if (req.params.region) {
        regionCondition = {
            region: req.params.region
        }
    }

    const doc = await Model.findOne({ where: { id: req.params.id }, include: [{model: AssocModel, as: assocAlias, include: [{model: Site, where: regionCondition, attributes: ['name', 'region']}]}]});

    if (!doc) { return next(new BAError('No Document found with that id', 404));}

    res.status(200).json({
        status: 'success',
        data: doc
    });

});

const getAllPublic = Model => catchAsync(async (req, res, next) => {

    const docs = await Model.findAll();

    res.status(200).json({
        status: 'success',
        data: docs
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
    const docs = await Model.findAll({limit, offset, where: filter});

    // console.log(docs);

    if (docs[0].password) {
        docs.forEach(singleDoc => {
            if (singleDoc.password) {
                singleDoc.password = undefined;
                singleDoc.password_confirm = undefined;
                singleDoc.password_reset_token = undefined;
                singleDoc.password_reset_expires = undefined;
            }
        });
    }

    res.status(200).json({
        status: 'success',
        stats: {
            records: occurences,
            perpage: limit,
            current: docs.length,
            offset: offset
        },
        data: docs
    });
});

module.exports = {
    createOne,
    getOne,
    getOneAssoc,
    getAssocSite,
    getAll,
    getAllPublic,
    updateOne,
    deleteOne,
    createUserAsset
}