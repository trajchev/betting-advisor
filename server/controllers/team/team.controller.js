const multer = require('multer');

const BAError = require('../../utils/BAError');
const models = require('../../models/models');
const factory = require('../handlers/handlerFactory');

// Multer setup for team logo
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/public/img/teams');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `team-${req.params.id}-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new BAError('The uploaded file is not an image!', 400));
    }
};

const upload = multer({
    storage: multerStorage,
    filter: multerFilter
});

const uploadTeamLogo = upload.single('photo');
const getTeams = factory.getAll(models.Team);
const getTeam = factory.getOne(models.Team);
const updateTeam = factory.updateOne(models.Team);

module.exports = {
    getTeams,
    getTeam,
    updateTeam,
    uploadTeamLogo
};