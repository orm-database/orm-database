import axios from 'axios';
import Pubsub from './pubsub';
import { API, NOTIF } from './constants';

var Auth = {};

(function (obj) {
  // @TODO 
  var user = {};

  obj.sendSigninRequest = (params) => {
    // API require email OR alias
    // forcing email at the moment - may implement more elegant logic later
    if (validateSigninRequest(params)) {
      let signinObj = {
        email: params.email,
        password: params.password
      };

      axios.post(API.signin, signinObj).then(response => {
        user = response.data.user;
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
        user = response.data.user;
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
    axios({
      url: API.signout,
      method: 'delete',
      data: {
        user_id: user.user_id
      }
    }).then(response => {
      if (response.status == 200) {
        user = {};
        Pubsub.publish(NOTIF.SIGN_OUT, null);
      } else {
        // @TODO not sure what to do in a .then handler here
      }
    }).catch(error => {
      console.log(error);
      // @TODO send an error back to the user
    })
  }

  // @TODO implement some sort of persistent session check

})(Auth);

const validateSigninRequest = (params) => {
  // API requires either email or alias, and password
  if ((params.alias || params.email) && params.password) {
    return true;
  }
  return false;
}

const validateSignupRequest = (params) => {
  /* API requires all of:
    first_name
    last_name
    email_address
    alias
    password
  */
  if (params.first_name &&
    params.last_name &&
    params.email_address &&
    params.alias &&
    params.password) {
    return true;
  }

  return false;
}

export default Auth;