import axios from 'axios';
import Pubsub from './pubsub';
import Auth, { user } from './auth';
import { API, NOTIF } from './constants';
import shallowCopyObj from './shallowCopy';

const io = require('socket.io-client');

var Data = {};

var AllChannels = {};
var Channels = {};
var CurrentChannel = {};
var Users = {};

(function (obj) {

  // SOCKET IO TEST
  var socket = io();

  socket.on('time', function (timeString) {
    // console.log(timeString);
  });

  // @TODO create a listener function for new messages on the current channel
  // socket.io client library?
  obj.joinSocketRoom = (channelId) => {

  }

  obj.leaveSocketRoom = (channelId) => {

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
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    });
  }

  obj.sendMessage = (params) => {
    axios.post(API.sendMessage, {
      user_id: Auth.user.user_id,
      message_text: params.message_text
    }).then(response => {
      // @TODO add message to currentMessages and publish a notification
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    });
  }

  // @TODO send auth token with get request
  obj.fetchMessages = (channelId) => {
    // @TODO fix the route when we figure out the endpoint
    axios.get(API.getMessages).then(response => {
      // set currentChannel with response info
      console.log(response.data);
      Pubsub.publish(NOTIF.MESSAGES_RECEIVED, null);
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    });
  }

  obj.handleSignout = () => {
    AllChannels = {};
    Channels = {};
    CurrentChannel = {};
    Users = {};
  }
})(Data);

export default Data;

export {
  AllChannels,
  Channels,
  CurrentChannel,
  Users
};