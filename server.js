const http = require('http');
const debug = require("debug")("node-angular");
const bodyParser = require('body-parser');

const app = require('./server/app');
const ticketsRoutes = require('./server/routes/tickets');
const normalizePort = require('./server/utils/normalize-port');
const onError = require('./server/utils/error-handling');

const port = normalizePort(process.env.PORT || 3000);

app.set('port', port);

const server = http.createServer(app);

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