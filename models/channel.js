const orm = require("../config/orm.js");

let channels = {
    select: cb => {
        let query = {
            columns: ['channel_id', 'channel_name'],
            table: 'channels',
        };
        orm.select(query, cb);
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
        orm.select(query, cb);
    },
    create: (channelObj, cb) => {
        let query = {
            table: 'channels',
            data: channelObj //ensure the keys of the object match the table columns
        };
        orm.insert(query, cb);
    },
    delete: (where, cb) => {
        let query = {
            table: 'channels',
            where: [where]
        };
        orm.delete(query, cb);
    },
    insertChannelUsers: (channelUsers, cb) => {
        let query = {
            table: 'channel_user',
            data: channelUsers
        };
        orm.insert(query, cb);
    },
    selectChannelsJoinMessages: (where, cb) => {
        let query = {
            string: 'SELECT ?? FROM channels JOIN channel_message ON channel_message.channel_id = channels.channel_id JOIN messages ON messages.message_id = channel_message.message_id JOIN users ON users.user_id = messages.user_id WHERE channels.channel_id = ? ORDER BY messages.message_time',
            columns: [
                'channels.channel_id',
                'channels.channel_name',
                'messages.message_id',
                'messages.message_text',
                'messages.message_time',
                'users.user_id',
                'users.first_name',
                'users.last_name',
                'users.email_address',
                'users.alias',
                'users.created',
                'users.updated'
            ],
            where: [where],
        };

        orm.selectJoinWhere(query, {}, cb);
    }
};

module.exports = channels;