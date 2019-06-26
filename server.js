require('dotenv').config();

var express = require('express');
var app = express();

const path = require('path');
const env = process.env.NODE_ENV || 'development';
const reactConfig = require(path.join(__dirname, '/config/config.static.json'))[env];

// Default port cannot be 3000
// If you change it from 9000, you must also change the "proxy" field in ./client/package.json
var port = process.env.PORT || 9000;

var config = require('./config/config');

app.use(express.static(path.join(__dirname, reactConfig))); // serving react files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
require("./routes/api-routes")(app);

app.listen(port);

// ****** IMPORTANT *******
// Don't create a get route for '/' because heroku will get confused and overwrite the static react files
// ************************