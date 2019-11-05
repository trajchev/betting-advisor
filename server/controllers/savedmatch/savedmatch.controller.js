const jwt = require('jsonwebtoken');

const models = require('../../models/models');
const catchAsync = require('../../utils/catchAsync');

const SavedMatch = models.SavedMatch;

const saveMatch = catchAsync( async (req, res, next) => {

    const decoded = jwt.decode(req.headers.cookie.split('=')[1]);

    const matchId = +req.params.matchId;
    const userId = decoded.id;

    const newSavedGame = await SavedMatch.create({
        userId, matchId
    });

    res.json({
        message: 'success',
        data: {
            savedGame: newSavedGame
        }
    });

});

module.exports = saveMatch;