import axios from 'axios';
import Pubsub from './pubsub';
import { API, NOTIF } from './constants';

var Auth = {};

(function(obj) {
  // @TODO 
  var user = {};

  obj.sendSigninRequest = (email, password) => {
    axios.post(API.signin, {
      email: email,
      password: password
    }).then(response => {
      user = response.data.user;
      Pubsub.publish(NOTIF.SIGN_IN, null);
    }).catch(error => {
      // @TODO return error codes and display helpful messages to the user, i.e. incorrect password, etc.
      // Potentially make more DRY
      console.log(error);
    });
  }

  obj.sendSignupRequest = (email, password) => {
    axios.post(API.signup, {
      email: email,
      password: password
    }).then(response => {
      user = response.data.user;
      Pubsub.publish(NOTIF.SIGN_IN, null);
    }).catch(error => {
      // @TODO return error codes and display helpful messages to the user, i.e. incorrect password, etc.
      // Potentially make more DRY
      console.log(error);
    });
  }

  obj.sendSignoutRequest = () => {
    axios({
      url: API.signout,
      method: 'patch',
      data: {
        user_id: user.user_id
      }
    }).then(response => {
      if (response.status == 200) {
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

export default Auth;