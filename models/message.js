const orm = require("../config/orm.js");

let messages = {
    select: (cb) => {
        let query = {
            columns: ['message_id', 'message_text'],
            table: 'messages',
        };
        orm.select(query, (error, data) => {
            cb(data);
        });
    },
    selectJoin: (cb) => {
        let queryString = `SELECT * FROM messages 
                            JOIN messages
                                ON messages.user_id = users.user_id WHERE users.user_id = ? `;
        let queryArray = 1;
        orm.query(queryString, queryArray, (error, data) => {
            console.log(data);
        });
    },
    selectWhere: (where, cb) => {
        let query = {
            columns: ['message_id', 'message_text'],
            table: 'messages',
            where: [where]
        };
        orm.select(query, (error, data) => {
            cb(data);
        });
    },
    create: (channelObj, cb) => {
        let query = {
            table: 'messages',
            data: channelObj //ensure the keys of the object match the table columns
        };
        orm.insert(query, (error, data) => {
            if (error) {
                console.log(error.code + ' - ' + error.sqlMessage);
            }
            cb(data);
        });
    },
    delete: (message_id, cb) => {
        let query = {
            table: 'messages',
            where: [{ message_id: message_id }]
        };
        orm.delete(query, (error, data) => {
            cb(data);
        });
    },

};

module.exports = messages;