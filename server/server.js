const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
// create express app
const app = express();
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '100kb'}));
const session = require('express-session');
// Configuring the database
const dbConfig = require('./config/database.config.js');
// required for passport
app.use(session({
    secret: 'eminem', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./config/passport')
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to test application."});
});
// Require Users routes
require('./app/routes/user.routes.js')(app);
// listen for requests
app.listen(3003, () => {
    console.log("Server is listening on port 3003");
});
