const orm = require("../config/orm.js");

let users = {
    select: (cb) => {
        let query = {
            columns: ['user_id', 'alias', 'first_name', 'last_name'], //will default to ['*'] (not recommended)
            table: 'users',
        };
        orm.select(query, (error, data) => {
            // console.log(data);
            cb(data);
        });
    },
    selectJoin: (cb) => {
        let queryString = `SELECT * FROM users 
                            JOIN messages
                                ON messages.user_id = users.user_id WHERE users.user_id = ? `;
        let queryArray = 1;//[user.user_id]; //has to be a primitive value
        orm.query(queryString, queryArray, function (error, data) {
            console.log(data);
        });
    },
    selectWhere: (where, cb) => {
        let query = {
            columns: ['user_id', 'alias', 'first_name', 'last_name'], //will default to ['*'] (not recommended)
            table: 'users',
            where: [where]
        };
        orm.select(query, (error, data) => {
            cb(data);
        });
    },
    createUser: (userObj, cb) => {
        let query = {
            table: 'users',
            data: userObj //ensure the keys of the object match the table columns
        };
        orm.insert(query, (error, data) => {
            if (error) {
                console.log(error.code +' - ' +error.sqlMessage);
            }
            cb(data);
        });
    },
    deleteUser: (user_id, cb) => {
        let query = {
            table: 'users',
            where: [{ user_id: user_id }]
        };
        orm.delete(query, (error, data) => {
            cb(data);
        });
    },

    login: (cb) => {
        orm.login("users", (res) => {
            cb(res);
        });
    },

};

// Export the database functions for the controller (catsController.js).
module.exports = users;