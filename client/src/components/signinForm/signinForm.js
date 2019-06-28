import React, { useState } from 'react';
import './signinForm.css';

import Auth from '../../utilities/auth';

function SigninForm(props) {
  /* props = {
    toggleModalType: Function that calls the parent toggleModalType function
    changeTypeBtnText: Text to display in the button above the submit button, i.e. "Already have an account?"
  } */

  const [emailVal, setEmailVal] = useState('');

  const handleEmailChange = (event) => {
    setEmailVal(event.target.value);
  }

  const authSubmit = () => {
    // Eventually make a call to Auth.sendSigninRequest
    // Don't worry about actually making that call because the Auth object doesn't play nice with the API yet.

    // The modal will not close when you submit because we want it to wait for a successful auth request before closing it.  If we don't get a status 200 back then we'll display an error message -- work on this later

    console.log('Signin form submitted');
    console.log('email: ' + emailVal);
    // console.log passwordVal
  }

  return (
    <form>
      <div className='modal-body'>
        <div className='form-group'>
          <label>Email Address</label>
          <input type='email' className='form-control' placeholder='Enter email' value={emailVal} onChange={handleEmailChange}></input>
        </div>
        <div className='form-group'>
          {/* Fill in the password part of the form here - it should look like the email form group above */}
        </div>

        {/* LEAVE THE BELOW HTML AS IS */}
        <button type='button' className='btn btn-link' onClick={props.toggleModalType}>{props.changeTypeBtnText}</button>
        <div className='modal-footer'>
          <button type='submit' className='btn btn-primary' onClick={authSubmit}>Submit</button>
        </div>
      </div>
    </form>
  );
}

export default SigninForm;