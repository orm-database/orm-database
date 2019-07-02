require('dotenv').config();

var express = require('express');
const socketIO = require('socket.io');
var app = express();

const path = require('path');
const env = process.env.NODE_ENV || 'development';
const reactConfig = require(path.join(__dirname, '/config/config.static.json'))[env];

// Default port cannot be 3000
// If you change it from 9000, you must also change the "proxy" field in ./client/package.json
var PORT = process.env.PORT || 9000;

var config = require('./config/config');

app.use(express.static(path.join(__dirname, reactConfig))); // serving react files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// require("./routes/api-routes")(app);
var userRoute = require("./controllers/users.js");
var channelRoute = require("./controllers/channels.js");
var messageRoute = require("./controllers/messages.js");
var groupRoute = require("./controllers/groups.js");
app.use(userRoute);
app.use(channelRoute);
app.use(messageRoute);
app.use(groupRoute);

const server = app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});

const io = socketIO(server);
require('./middleware/socket')(io);

// ****** IMPORTANT *******
// Don't create a get route for '/' because heroku will get confused and overwrite the static react files
// ************************