require('dotenv').config();

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const path = require('path');
const env = process.env.NODE_ENV || 'development';
const reactConfig = require(path.join(__dirname, '/config/config.static.json'))[env];

// Default port cannot be 3000
// If you change it from 9000, you must also change the "proxy" field in ./client/package.json
var port = process.env.PORT || 9000;

var config = require('./config/config');

app.use(express.static(path.join(__dirname, reactConfig))); // serving react files
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port);

// ****** IMPORTANT *******
// Don't create a get route for '/' because heroku will get confused and overwrite the static react files
// ************************

//@TODO Delete below after you verify the the app is working
// app.route('/').get(function(request, response) {
//     response.json(config);
// });

io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data){
        console.log(data);
    });
});