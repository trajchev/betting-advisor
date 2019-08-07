const bodyParser = require('body-parser');

const app = require('./server/app');
const ticketsRoutes = require('./server/routes/tickets');

// Set the port number to one given by the hosting provider or default to 3000
const port = process.env.PORT || 3000;

app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', ticketsRoutes)

app.listen(port);