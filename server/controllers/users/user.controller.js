const multer = require('multer');

const catchAsync = require('../../utils/catchAsync');
const BAError = require('../../utils/BAError');
const factory = require('../handlers/handlerFactory');
const models = require('../../models/models');

const User = models.User;
const Match = models.Match;
const SavedMatch = models.SavedMatch;

// Multer setup
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/users');
    },
    filename: (req, file, cb) => {
        // user -id - timestamp - extention
        const extention = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${extention}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new BAError('Not an image!', 400));
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

const deleteUser = factory.deleteOne(User);

const updateMe = catchAsync(async (req, res, next) => {
    // 1. Create error if user posts pass data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new BAError('This route is not for password updates', 400));
    }

    // 2. Exclude not allowed fields
    const filteredBody = filterObj(req.body, 'name', 'email');
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

const getMe = (req, res, next) => {
    const userId = req.user.id
    req.params.id = userId;
    next();
}

const saveMatch = (req, res, next) => {
    const newUserMatch = SavedMatch.create({
        userId: req.user.id,
        matchId: 1
    });

    return newUserMatch.save()
    .then(res => {
        res.json({status: 'success', message: 'You saved this match'});
    })
    .catch(err => {
        console.log('Error status', err.response.status);
        console.log(err.response.data);
    });
}

const getMyTickets = catchAsync( async (req, res, next) => {

    const userId = req.user.id;

    const myTickets = await SavedMatch.findAll({attributes: ['createdAt', 'updatedAt'],  where: {userId},
        include: [{
            model: Match
        }]
    });

    res.status(200).json({
        status: 'success',
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
    saveMatch,
    getMyTickets
};
