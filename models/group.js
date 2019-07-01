const orm = require('../config/orm.js');

let group = {
    create: (groupObj, cb) => {
        let query = {
            table: 'direct_groups',
            columns: 'direct_group_id',
            data: groupObj
        };
        orm.insertNull(query, cb);
    },
    insertGroupUsers: (groupUsers, cb) => {
        let query = {
            table: 'direct_group_user',
            data: groupUsers
        };
        orm.insert(query, cb);
    }
};

module.exports = group;