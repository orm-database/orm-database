import axios from 'axios';
import Pubsub from './pubsub';
import Auth from './auth';
import { API, NOTIF } from './constants';

const io = require('socket.io-client');

var Data = {};

(function (obj) {
  var channels = {};
  var currentMessages = {};

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

  // @TODO make post requests more DRY
  obj.createChannel = (channelName, channelType, channelPassword) => {
    axios.post(API.create, {
      channel_name: channelName,
      channel_type: channelType,
      channel_password: channelPassword,
      token: Auth.user.token
    }).then(response => {
      // @TODO add new channel to channels, or overwrite?
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    });
  }

  obj.joinChannel = (channelName, channelType, channelPassword) => {
    axios.post(API.join, {
      channel_name: channelName,
      channel_type: channelType,
      channel_password: channelPassword,
      token: Auth.user.token
    }).then(response => {
      // @TODO add new channel to channels, or overwrite?
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    });
  }

  obj.sendMessage = (channelId, message) => {
    axios.post(API.sendMessage, {
      channel_id: channelId,
      message: message,
      token: Auth.user.token
    }).then(response => {
      // @TODO add message to currentMessages and publish a notification
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    });
  }

  // @TODO send auth token with get request
  obj.fetchMessages = (channelId) => {
    axios.get(API.getMessages + channelId).then(response => {
      currentMessages = response.data.messages;
      Pubsub.publish(NOTIF.MESSAGES_RECEIVED, null);
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    })
  }
})(Data);

export default Data;