const models = require('../../models/models');
const catchAsync = require('../../utils/catchAsync');

const SavedMatch = models.SavedMatch;

const saveMatch = catchAsync( async (req, res, next) => {

    // Get the requesting user id and the match id to save for user
    const matchId = +req.body.matchId;
    const userId = +req.user.id;

    const newSavedGame = await SavedMatch.create({userId, matchId});

    res.json({
        status: 'success',
        data: {
            savedGame: newSavedGame
        }
    });

});

module.exports = saveMatch;