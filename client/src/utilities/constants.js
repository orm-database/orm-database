// Global name of the application
export const APP_NAME = '**Placeholder**';

// Chat Group Types
export const CHAT_GROUP_TYPES = {
  empty: 'empty',
  loading: 'loading',
  group: 'group',
  direct: 'direct'
};

// Notification strings for pubsub
export const NOTIF = {
  MODAL_TOGGLE: 'modal_toggle',
  SIGN_IN: 'signin',
  SIGN_UP: 'signup',
  SIGN_OUT: 'signout',
  MESSAGES_RECEIVED: 'messages_received'
};

// API routes
// @TODO change these to match what the backend engineers go with
export const API = {
  signin: '/api/signin',
  signup: '/api/users',
  signout: '/api/signout',
  create: '/api/create',
  join: '/api/join',
  sendMessage: '/api/send',
  getMessages: '/api/get/'
};

// Auth modal types
// Doubly purposed to be the text displayed at the top of the modal
export const AUTH_MODAL_TYPES = {
  signin: 'Sign In',
  signup: 'Sign Up'
};