// Global name of the application
export const APP_NAME = 'Babel';

// Chat Group Types
export const CHAT_GROUP_TYPES = {
  empty: 'empty',
  loading: 'loading',
  channel: 'channel',
  direct: 'direct'
};

// Notification strings for pubsub
export const NOTIF = {
  MODAL_TOGGLE: 'modal_toggle',
  GROUP_MODAL_TOGGLE: 'group_modal_toggle',
  DIRECT_MESSAGE_MODAL_TOGGLE: 'direct_message_modal_toggle',
  SIGN_IN: 'signin',
  SIGN_UP: 'signup',
  SIGN_OUT: 'signout',
  AUTH_ERROR: 'auth_error',
  MESSAGES_RECEIVED: 'messages_received',
  GROUPS_DOWNLOADED: 'groups_downloaded',
  DIRECT_MESSAGE_USERS_DOWNLOADED: 'direct_message_users_downloaded',
  DMS_DOWNLOADED: 'dms_downloaded',
  GROUP_SELECTED: 'group_selected',
  CHANNEL_JOIN: 'channel_join',
  TOGGLE_SIDEBAR_MOBILE: 'toggle_sidebar_mobile'
};

// API routes
export const API = {
  getUsers: '/api/users',
  getUserById: '/api/user/',
  signin: '/api/users/login',
  signup: '/api/users',
  signout: '/api/users/login',
  deleteUserById: '/api/users/',
  getAllChannels: '/api/channels',
  getChannelById: '/api/channels/',
  createChannel: '/api/channels',
  deleteChannelById: '/api/channels/',
  join: '/api/channel-users',
  sendMessage: '/api/messages',
  getMessages: '/api/messages',
  getMessagesByChannelId: '/api/messages/channel/',
  getMessageById: '/api/messages/',
  deleteMessageById: '/api/messages/',
  getAllUsers: '/api/users',
  createDirectMessage: '/api/groups'
};

// Auth modal types
// Doubly purposed to be the text displayed at the top of the modal
export const AUTH_MODAL_TYPES = {
  signin: 'Sign In',
  signup: 'Sign Up'
};

// New group modal types
// Doubly purposed to be the text displayed at the top of the modal
export const GROUP_MODAL_TYPES = {
  group: 'New Group',
  direct: 'New Direct Message'
};