const models = require('../../models/models');
const catchAsync = require('../../utils/catchAsync');

const getHomeStats = catchAsync(async (req, res, next) => {

    const sportsCount = await models.Sport.count();
    const bookmakersCount = await models.Site.count();
    const teamsCount = await models.Team.count();
    const h2hCount = await models.H2H.count();
    const spreadsCount = await models.Spreads.count();
    const totalsCount = await models.Totals.count();

    res.status(200).json({
        status: 'success',
        data: {
            sports: sportsCount,
            bookmakers: bookmakersCount,
            teams: teamsCount,
            h2h: h2hCount,
            spreads: spreadsCount,
            totals: totalsCount
        }
    });

});

module.exports = {
    
    getHomeStats

};