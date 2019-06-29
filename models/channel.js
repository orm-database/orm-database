const orm = require("../config/orm.js");

let channels = {
    select: (cb) => {
        let query = {
            columns: ['channel_id', 'channel_name'],
            table: 'channels',
        };
        orm.select(query, (error, data) => {
            cb(data);
        });
    },
    selectJoin: (cb) => {
        let queryString = `SELECT * FROM channels 
                            JOIN messages
                                ON messages.user_id = users.user_id WHERE users.user_id = ? `;
        let queryArray = 1;
        orm.query(queryString, queryArray, (error, data) => {
            console.log(data);
        });
    },
    selectWhere: (where, cb) => {
        let query = {
            columns: ['channel_id', 'channel_name'],
            table: 'channels',
            where: [where]
        };
        orm.select(query, (error, data) => {
            cb(data);
        });
    },
    create: (channelObj, cb) => {
        let query = {
            table: 'channels',
            data: channelObj //ensure the keys of the object match the table columns
        };
        orm.insert(query, (error, data) => {
            if (error) {
                console.log(error.code + ' - ' + error.sqlMessage);
            }
            cb(data);
        });
    },
    delete: (user_id, cb) => {
        let query = {
            table: 'users',
            where: [{ user_id: user_id }]
        };
        orm.delete(query, (error, data) => {
            cb(data);
        });
    },
    insertChannelUsers: (channelUsers, cb) => {
        let query = {
            table: 'channel_user',
            data: channelUsers
        };
        orm.insert(query, cb);
    }

};

module.exports = channels;