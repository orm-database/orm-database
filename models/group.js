let orm = require('../config/orm.js');

let group = {
    select: cb => {
        let query = {
            columns: ['direct_group_id'],
            table: 'direct_groups',
        };
        orm.select(query, cb);
    },
    create: (groupObj, cb) => {
        let query = {
            table: 'direct_groups',
            columns: 'direct_group_id',
            data: groupObj
        };
        orm.insertNull(query, cb);
    },
    selectGroupsJoinMessages: (where, cb) => {
        let query = {
            string: 'SELECT ?? FROM direct_groups JOIN direct_group_message ON direct_group_message.direct_group_id = direct_groups.direct_group_id JOIN messages ON messages.message_id = direct_group_message.message_id JOIN users ON users.user_id = messages.user_id WHERE direct_groups.direct_group_id = ? ORDER BY messages.message_time',
            columns: [
                'direct_groups.direct_group_id',
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

module.exports = group;