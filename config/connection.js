var mysql = require("mysql");
var config = require(__dirname + "/../config.json")[process.env.APP_ENV || 'local'];

var connection = mysql.createConnection({
    user: config.user,
    password: config.password,
    host: config.host,
    port: config.port,
    database: config.database
});

connection.connect(function (error) {
    if (error) throw error;
});

module.exports = connection;