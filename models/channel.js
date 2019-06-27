const orm = require("../config/orm.js");

let channels = {
    select: function (cb) {
        let query = {
            columns: ['channel_id', 'channel_name'],
            table: 'channels',
        };
        orm.select(query, function (error, data) {
            cb(data);
        });
    },
    selectJoin: function (cb) {
        let queryString = `SELECT * FROM channels 
                            JOIN messages
                                ON messages.user_id = users.user_id WHERE users.user_id = ? `;
        let queryArray = 1;
        orm.query(queryString, queryArray, function (error, data) {
            console.log(data);
        });
    },
    selectWhere: function (where, cb) {
        let query = {
            columns: ['channel_id', 'channel_name'],
            table: 'channels',
            where: [where]
        };
        orm.select(query, function (error, data) {
            cb(data);
        });
    },
    create: function (channelObj, cb) {
        let query = {
            table: 'channels',
            data: channelObj //ensure the keys of the object match the table columns
        };
        orm.insert(query, function (error, data) {
            if (error) {
                console.log(error.code + ' - ' + error.sqlMessage);
            }
            cb(data);
        });
    },
    delete: function (user_id, cb) {
        let query = {
            table: 'users',
            where: [{ user_id: user_id }]
        };
        orm.delete(query, function (error, data) {
            cb(data);
        });
    },

};

module.exports = channels;