const orm = require("../config/orm.js");

let messages = {
  select: (cb) => {
    let query = {
      columns: ['message_id', 'message_text', 'message_time'],
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
  selectAllMessages: (cb) => {
    let queryString = `
        SELECT messages.message_text, messages.message_time, users.user_id, users.first_name, users.last_name, users.alias FROM messages 
            JOIN users
  	            ON messages.user_id = users.user_id`;
    let queryArray = 1;
    orm.query(queryString, queryArray, (error, data) => {
      cb(data);
    });
  },
  selectByMessageId: (message_id, cb) => {
    let queryString = `
        SELECT messages.message_text, messages.message_time, users.user_id, users.first_name, users.last_name, users.alias FROM messages 
            JOIN users
  	            ON messages.user_id = users.user_id
            WHERE messages.message_id = `+ message_id;
    let queryArray = 1;
    orm.query(queryString, queryArray, (error, data) => {
      cb(data);
    });
  },
  selectByChannelId: (channel_id, cb) => {
    let queryString = `
        SELECT channels.channel_id, channels.channel_name, channel_message.message_id, messages.message_text, messages.message_time,  
	                users.user_id, users.first_name, users.last_name, users.alias
        FROM channel_message
	        JOIN messages
		        ON messages.message_id = channel_message.message_id
	        JOIN channels
		        ON channels.channel_id = channel_message.channel_id
	        JOIN users
		        ON users.user_id = messages.user_id
        WHERE channel_message.channel_id  = `+ channel_id;
    let queryArray = 1;
    orm.query(queryString, queryArray, (error, data) => {
      cb(data);
    });
  },
  create: (channelObj, cb) => {
    let messageObj = {
      user_id: channelObj.user_id,
      message_text: channelObj.message_text
    }
    let query = {
      table: 'messages',
      data: messageObj //ensure the keys of the object match the table columns
    };
    orm.insert(query, (error, data) => {
      if (error) {
        console.log(error.code + ' - ' + error.sqlMessage);
      }
      var message_id = data.insertId;
      let channelMessageObj = {
        channel_id: channelObj.channel_id,
        message_id: message_id
      }
      let query = {
        table: 'channel_message',
        data: channelMessageObj //ensure the keys of the object match the table columns
      };
      orm.insert(query, (error, data) => {
        if (error) {
          console.log(error.code + ' - ' + error.sqlMessage);
        }
      })
      cb(data);
    });
  },
  createDM: (directObj, cb) => {
    let messageObj = {
      user_id: directObj.user_id,
      message_text: directObj.message_text
    }
    let query = {
      table: 'messages',
      data: messageObj //ensure the keys of the object match the table columns
    };
    orm.insert(query, (error, data) => {
      if (error) {
        console.log(error.code + ' - ' + error.sqlMessage);
      }
      var message_id = data.insertId;
      let directMessageObj = {
        direct_group_id: +directObj.direct_group_id,
        message_id: message_id
      };
      let query = {
        table: 'direct_group_message',
        data: directMessageObj
      };
      orm.insert(query, (error, data) => {
        if (error) console.log(error.code + ' - ' + error.sqlMessage);
      });
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