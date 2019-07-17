// built in modules
const http = require('http');

// npm modules
const debug = require("debug")("node-angular");
const bodyParser = require('body-parser');

// Local modules
const app = require('./server/app');
const ticketsRoutes = require('./server/routes/tickets');
const normalizePort = require('./server/utils/normalize-port');
const onError = require('./server/utils/error-handling');

// Set the port number to one given by the hosting provider or default to 3000
const port = normalizePort(process.env.PORT || 3000);

app.set('port', port);

const server = http.createServer(app);

// handle the listening event on the express server / active server state
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe' + addr : 'port' + port;
    debug('Listening on ', bind);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(ticketsRoutes)

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);