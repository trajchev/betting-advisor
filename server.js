const bodyParser = require('body-parser');

const app = require('./server/app');
const ticketsRoutes = require('./server/routes/tickets');
const sequelize = require('./server/utils/db');

// Set the port number to one given by the hosting provider or default to 3000
const port = process.env.PORT || 3000;

app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', ticketsRoutes)

sequelize.sync()
    .then(result => {
        // console.log(result);
        app.listen(port);
    })
    .catch(err => {console.log(err)})