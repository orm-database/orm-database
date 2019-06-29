let orm = require('../config/orm.js');

let group = {
    create: (groupObj, cb) => {
        let query = {
            table: 'direct_groups',
            columns: 'direct_group_id',
            data: groupObj
        };
        orm.insertNull(query, cb);
    }
};

module.exports = group;