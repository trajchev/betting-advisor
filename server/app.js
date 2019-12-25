const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const routes = require('./routes/routes');
const BAError = require('./utils/BAError');

const userRoutes = routes.user;
const leagueRoutes = routes.league;
const matchRoutes = routes.match;
const cronJob = require('./utils/cron');

const app = express();

app.enable('trust proxy');

// 1. GLOBAL MIDDLEWARES
    // Implement CORS
    app.use(cors());
    app.options('*', cors());

    // Serve static files
    app.use(express.static(path.join(__dirname, 'public')));

    // Use helmet for setting basic security headers
    app.use(helmet());

    // Dev logging
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    // Limit requests from same IP
    const limiter = rateLimit({
        max: 100,
        // windowMs: 60 * 60 * 1000,
        windowMs: 60 * 60,
        message: 'Too many requests from this IP, please try again in an hour!'
    });
    app.use('/api', limiter);

    // Body parser and cookie parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    
    // Prevent XSS
    app.use(xss());

    // Prevent parameter pollution
    app.use(
        hpp({
            whitelist: [
                'token',
                'page',
                'id',
                'league',
                'matchId',
                'group'
            ]
        })
    )

    app.use(compression());

    // Set up headers for allowing requests from API CONSUMER (me :) )
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
        next();
    });

    // Execute defined cron jobs
    // cronJob.getSports;
    cronJob.getMatches();
    // cronJob.getSports();

// 2. ROUTES
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/leagues', leagueRoutes);
app.use('/api/v1/matches', matchRoutes);

app.all('*', (req, res, next) => {
    next(new BAError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;