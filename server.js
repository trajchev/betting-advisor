const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const app = require('./server/app');
const sequelize = require('./server/utils/db');

// Set the port number to one given by the hosting provider or default to 3000
const port = process.env.PORT || 3300;

// console.log(process.env.API_URL);

app.set('port', port);

sequelize.sync()
.then(result => {
    // console.log(result);
    app.listen(port);
})
.catch(err => {
    console.log(err)
});