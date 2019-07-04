import axios from 'axios';
import Pubsub from './pubsub';
import { API, NOTIF } from './constants';
import { shallowCopyObj } from './helper';
import Data from './data';

var Auth = {};

var user = {};

(function (obj) {
  // @TODO 

  obj.checkForExistingSession = () => {
    let session_token = localStorage.getItem('x-session-token');
    let headers = {
      'x-session-token': session_token
    };

    if (session_token) {
      axios.get(API.getUsers, { headers: { 'x-session-token': session_token } }).then(response => {
        if (validateUserData(response.data)) {
          user = shallowCopyObj(response.data);
        }
        console.log(user);
        Pubsub.publish(NOTIF.SIGN_IN, null);
      }).catch(error => {
        console.log(error);
      });
    }
  }

  obj.sendSigninRequest = (params) => {
    // API require email OR alias
    // forcing email at the moment - may implement more elegant logic later
    if (validateSigninRequest(params)) {
      let signinObj = {
        email_address: params.email_address,
        password: params.password
      };

      axios.post(API.signin, signinObj).then(response => {
        let session_token = response.headers['x-session-token'];
        localStorage.setItem('x-session-token', session_token);
        user = shallowCopyObj(response.data);
        console.log(user);
        // user = response.data.user;
        Pubsub.publish(NOTIF.SIGN_IN, null);
      }).catch(error => {
        // @TODO return error codes and display helpful messages to the user, i.e. incorrect password, etc.
        // Potentially make more DRY
        console.log(error);
      });
    } else {
      // @TODO kick back a real error and display in the modal
      console.log('ERROR: problem with signin params:');
      console.log(params);
    }
  }

  obj.sendSignupRequest = (params) => {
    if (validateSignupRequest(params)) {
      console.log('sent signup request');
      axios.post(API.signup, {
        first_name: params.first_name,
        last_name: params.last_name,
        alias: params.alias,
        email_address: params.email,
        password: params.password,
        password_confirm: params.password_confirm
      }).then(response => {
        let session_token = response.headers['x-session-token'];
        localStorage.setItem('x-session-token', session_token);
        user = shallowCopyObj(response.data);
        console.log(user);
        Pubsub.publish(NOTIF.SIGN_IN, null);
      }).catch(error => {
        // @TODO return error codes and display helpful messages to the user, i.e. incorrect password, etc.
        // Potentially make more DRY
        console.log(error);
      });
    } else {
      // @TODO kick back a real error and display in the modal
      console.log('ERROR: problem with signup params:');
      console.log(params);
    }

  }

  obj.sendSignoutRequest = () => {
    // @TODO need to verify what direction we're taking with the session token business
    let session_token = localStorage.getItem('x-session-token');

    axios({
      url: API.signout,
      method: 'delete',
      headers: {
        'x-session-token': session_token
      }
    }).then(response => {
      if (response.status == 200) {
        user = {};
        localStorage.setItem('x-session-token', '');
        Pubsub.publish(NOTIF.SIGN_OUT, null);
        Data.handleSignout();
        console.log('signout success');
      } else {
        // @TODO not sure what to do in a .then handler here
        console.log('signout resolved, but not status 200');
      }
    }).catch(error => {
      console.log(error);
      // @TODO send an error back to the user
    });
  }

})(Auth);

const validateSigninRequest = (params) => {
  // API requires either email or alias, and password
  if ((params.alias || params.email_address) && params.password) {
    return true;
  }
  return false;
}

const validateSignupRequest = (params) => {
  /* API requires all of:
    first_name
    last_name
    email
    alias
    password
  */
  console.log(params);
  if (params.first_name &&
    params.last_name &&
    params.email &&
    params.alias &&
    params.password &&
    params.password_confirm) {
    return true;
  }

  return false;
}

const validateUserData = (data) => {
  if (data.alias &&
    data.created &&
    data.email_address &&
    data.first_name &&
    data.last_name &&
    data.updated &&
    data.user_id) {
    return true
  }

  return false;
}

export default Auth;

export {
  user
};