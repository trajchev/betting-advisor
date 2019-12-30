const multer = require('multer');

const catchAsync = require('../../utils/catchAsync');
const BAError = require('../../utils/BAError');
const factory = require('../handlers/handlerFactory');
const models = require('../../models/models');

const User = models.User;
const Match = models.Match;
const SavedMatch = models.SavedMatch;
const Recruits = models.Recruits;

// Multer setup
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/public/img/users');
    },
    filename: (req, file, cb) => {
        // user -id - timestamp - extention
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new BAError('The uploaded file is not an image!', 400));
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }
    });
    return newObj;
}

const uploadUserPhoto = upload.single('photo');

const getUser = factory.getOne(User);

// Do not update password with this
const updateUser = factory.updateOne(User);

const getAllUsers = factory.getAll(User);

const deleteUser = catchAsync(async (req, res, next) => {

    const user = await User.findOne ({where: {id: req.params.id}});

    if ( user ) {

        // Don't delete the user, just deactivate it
        user.update({'active': false});

    }

    res.status(200).json({
        status: 'success',
        message: `${user.username} deactivated`
    });

});

const updateMe = catchAsync(async (req, res, next) => {

    // 1. Create error if user posts pass data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new BAError('This route is not for password updates', 400));
    }

    // 2. Exclude not allowed fields
    const filteredBody = filterObj(req.body, 'username', 'email');
    if (req.file) filteredBody.photo = req.file.filename;

    // 3. Update user
    const updateUser = await User.update(filteredBody, {where: {id: req.user.id}});
    res.status(200).json({
        status: 'success',
        data: {
            user: updateUser
        }
    });
    
});

const getDashboardData = catchAsync(async (req, res, next) => {

    const userId = req.user.id;
    const limit = 3;

    const user = await User.findOne({where: {id: userId}});

    if (!user) { return next(new BAError('No Document found with that id', 404));}

    const occurences = await SavedMatch.count({where: {userId},
        include: [{
            model: Match
        }]
    });

    const myTickets = await SavedMatch.findAll({order: [
            ['createdAt', 'DESC'],
        ],
        attributes: ['id', 'createdAt', 'updatedAt'], limit, where: {userId},
        include: [{
            model: Match
        }]
    });

    const myRecruits = await Recruits.findAll({order: [
            ['createdAt', 'DESC'],
        ],
        attributes: ['createdAt'],
        include: [{
            model: User,
            where: { active: true },
            attributes: ['username', 'photo', 'role', 'active']
        }]
    });

    if (user.password) {
        const photo = user.photo;
        user.password = '';
        user.photo = `http://localhost:3300/img/users/${photo}`;
    }

    res.status(200).json({
        status: 'success',
        user,
        numberOfTickets: occurences,
        tickets: myTickets,
        recruits: myRecruits
    });
});

const getMe = (req, res, next) => {

    const userId = req.user.id

    req.params.id = userId;
    next();

}

const getMyTickets = catchAsync( async (req, res, next) => {

    let limit, page = 1, offset;

    if (req.params.perPage && req.params.page) {
        limit = +req.params.perPage;
        page = +req.params.page;
        offset = (page - 1) * limit;
    }

    const userId = req.user.id;

    const occurences = await SavedMatch.count({ where: {userId},
        include: [{
            model: Match
        }]
    });
    const myTickets = await SavedMatch.findAll({attributes: ['id'],
        order: [
            ['createdAt', 'DESC'],
        ],
        limit, offset, where: {userId},
        include: [{
            model: Match
        }]
    });

    res.status(200).json({
        status: 'success',
        stats: {
            records: occurences,
            perpage: limit,
            current: myTickets.length,
            offset: offset
        },
        data: myTickets
    });
});

const deleteMe = catchAsync( async (req, res, next) => {
    await User.update({active: false}, {where: {id: req.user.id}});

    res.status(204).json({
        status: 'success',
        data: null
    });
});

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    updateMe,
    deleteMe,
    getMe,
    uploadUserPhoto,
    getMyTickets,
    getDashboardData
};
