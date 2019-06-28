var mysql = require("mysql");
var config = require("./config.js");

var connection = mysql.createConnection(config.mysql.url);
connection.connect(function (error) {
    if (error) throw error;
    console.log("connected to database on " + connection.config.host + " as "
        + connection.config.user + "@" + connection.config.database);
});

module.exports = connection;