import axios from 'axios';
import Pubsub from './pubsub';
import Auth from './auth';
import { API, NOTIF } from './constants';

const io = require('socket.io-client');

var Data = {};

(function (obj) {
  var channels = {};
  var currentChannel = {};
  var users = {};

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
    axios.get(API.getAllChannels).then(response => {
      console.log('get all channels resolved');
      console.log(response);
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    })
  }

  obj.getChannelById = (params) => {
    axios.get(API.getAllChannels + params.channel_id).then(response => {
      console.log('get channel by Id resolved');
      console.log(response);
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    })
  }

  // @TODO make post requests more DRY
  obj.createChannel = (params) => {
    axios.post(API.createChannel, {
      channel_name: params.channel_name
    }).then(response => {
      // @TODO add new channel to channels, or overwrite?
      console.log('create channel resolved');
      console.log(response);
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    });
  }

  // @TODO create function for axios.delete channel

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
    axios.get(API.getMessages + channelId).then(response => {
      // set currentChannel with response info
      Pubsub.publish(NOTIF.MESSAGES_RECEIVED, null);
    }).catch(error => {
      console.log(error);
      // @TODO send helpful error back to user
    })
  }
})(Data);

export default Data;