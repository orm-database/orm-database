import axios from 'axios';
import Pubsub from './pubsub';
import Auth, { user } from './auth';
import { API, NOTIF } from './constants';
import { shallowCopyObj } from './helper';

import io from 'socket.io-client';

var Data = {};

var AllChannels = {};
var Channels = {};
var CurrentChannelMessages = {};
var Users = {};

(function (obj) {

  // SOCKET IO TEST
  let socket;

  obj.connectSocket = (userId) => {
    if (userId) {
      socket = io();
      let params = {
        user_id: userId
      };
      console.log(socket);
      socket.emit('join', params);

      socket.on('newMessage', (message_id) => {
        console.log('received newMessage emit');
        Pubsub.publish(NOTIF.MESSAGES_RECEIVED, message_id);
      });
    } else {
      console.log('userId undefined');
      console.log(userId);
    }
  }

  obj.changeSocketRoom = (channelId) => {
    socket.emit('switchRoom', channelId);
  }

  obj.emitSocketMessage = (messageId) => {
    console.log(socket);
    socket.emit('sendMessage', messageId);
  }

  obj.getAllChannels = () => {
    if (user.user_id) {
      axios.get(API.getAllChannels).then(response => {
        console.log('get all channels resolved');
        console.log(response.data);
        AllChannels = JSON.parse(JSON.stringify(response.data));
        Pubsub.publish(NOTIF.GROUPS_DOWNLOADED, AllChannels);
      }).catch(error => {
        console.log(error);
        // @TODO send helpful error back to user
      });
    }
  }

  obj.getChannelById = (params) => {
    axios.get(API.getAllChannels + params.channel_id).then(response => {
      console.log('get channel by Id resolved');
      console.log(response);
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    });
  }

  // @TODO make post requests more DRY
  obj.createChannel = (params) => {
    return new Promise((resolve, reject) => {
      axios.post(API.createChannel, {
        channel_name: params.channel_name
      }).then(response => {
        // @TODO add new channel to channels, or overwrite?
        console.log('create channel resolved');
        console.log(response);
        resolve(response.data);
      }).catch(error => {
        console.log(error);
        reject();
        // @TODO send helpful error back to user
      });
    });
    
  }

  // @TODO create function for axios.delete channel

  obj.joinChannel = (params) => {
    axios.post(API.join, {
      channel_id: params.channel_id,
      users: params.users
    }).then(response => {
      // @TODO add new channel to channels, or overwrite?
      Pubsub.publish(NOTIF.CHANNEL_JOIN, null);
      Pubsub.publish(NOTIF.GROUP_MODAL_TOGGLE, null);
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    });
  }

  obj.sendMessage = (params) => {
    let messageObj = {
      user_id: user.user_id,
      message_text: params.message_text,
      channel_id: params.channel_id
    };
    return new Promise((resolve, reject) => {
      axios.post(API.sendMessage, messageObj).then(response => {
        // @TODO add message to currentMessages and publish a notification
        console.log(response);
        resolve(response.data.insertId);
      }).catch(error => {
        console.log(error);
        reject(error);
        // @TODO send helpful error back to user
      });
    })
    
  }

  // Shouldn't be called by anything
  obj.fetchMessages = (channelId) => {
    axios.get(API.getMessages).then(response => {
      // set CurrentChannelMessages with response info
      console.log(response);
      CurrentChannelMessages = JSON.parse(JSON.stringify(response.data));
      Pubsub.publish(NOTIF.MESSAGES_RECEIVED, null);
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    });
  }

  // @TODO send auth token with get request
  obj.getChannelMessages = (channelId) => {
    axios.get(API.getMessagesByChannelId + channelId).then(response => {
      CurrentChannelMessages = JSON.parse(JSON.stringify(response.data));
      Pubsub.publish(NOTIF.MESSAGES_RECEIVED, null);
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    })
  }

  obj.fetchMessageById = (messageId) => {
    return new Promise((resolve, reject) => {
      axios.get(API.getMessageById + messageId).then(response => {
        console.log(response);
        resolve(response.data);
      }).catch(error => {
        console.log(error);
        reject(error);
      });
    });
  }

  obj.handleSignout = () => {
    AllChannels = {};
    Channels = {};
    CurrentChannelMessages = {};
    Users = {};
  }
})(Data);

export default Data;

export {
  AllChannels,
  Channels,
  CurrentChannelMessages,
  Users
};