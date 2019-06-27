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
                console.log(error.code + ' - ' + error.sqlMessage);
            }
            cb(error, data);
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

    selectByEmail: function (email, cb) {
        let query = {
            table: 'users',
            where: [{ email_address: email.toLowerCase() }]
        };

        orm.select(query, cb);
    },
    selectByAlias: function (alias, cb) {
        let query = {
            table: 'users',
            where: [{ alias }]
        };

        orm.select(query, cb);
    },
    selectAll: function (cb) {
        let query = {
            columns: [
                'user_id',
                'first_name',
                'last_name',
                'email_address',
                'alias',
                'session_token',
                'created',
                'updated'],
            table: 'users'
        };

        orm.select(query, cb);
    },
    selectById: function (user_id, cb) {
        let query = {
            columns: [
                'user_id',
                'first_name',
                'last_name',
                'email_address',
                'alias',
                'session_token',
                'created',
                'updated'],
            table: 'users',
            where: [{ user_id }]
        };

        orm.select(query, cb);
    },
    selectBySession: function (session_token, cb) {
        let query = {
            columns: [
                'user_id',
                'first_name',
                'last_name',
                'email_address',
                'alias',
                'session_token',
                'created',
                'updated'],
            table: 'users',
            where: [{ session_token }]
        };

        orm.select(query, cb);
    },
    delete: function (user_id, cb) {
        let query = {
            table: 'users',
            where: [{ user_id }]
        };

        orm.delete(query, cb);
    },
    updateSession: function (email, uuid, cb) {
        let query = {
            table: 'users',
            data: { session_token: uuid },
            where: [{ email_address: email.toLowerCase() }]
        };

        orm.update(query, cb);
    },
    removeSession: function (session, cb) {
        let query = {
            table: 'users',
            data: { session_token: null },
            where: [{ session_token: session }]
        };

        orm.update(query, cb);
    },
};

// Export the database functions for the controller (catsController.js).
module.exports = users;