import React, { useState } from 'react';

// When using bootstrap, these types of files are often empty, but I still keep them in case I want to tweak something later
import './signinForm.css';

import Auth from '../../utilities/auth';
import FormInput from '../formInput/formInput';

function SigninForm(props) {
  /* props = {
    toggleModalType: Function that calls the parent toggleModalType function
    changeTypeBtnText: Text to display in the button above the submit button, i.e. "Already have an account?"
  } */

  const [emailVal, setEmailVal] = useState('');
  // Add the necessary local state for password input with the useState hook
  const [passwordVal, setPasswordVal] = useState('');

  const handleEmailChange = (event) => {
    setEmailVal(event.target.value);
  }

  // implement a handler function for the user typing in the password field
  const handlePasswordChange = (event) => {
    setPasswordVal(event.target.value);
  }

  const authSubmit = (event) => {
    event.preventDefault();
    // Eventually make a call to Auth.sendSigninRequest
    // Don't worry about actually making that call because the Auth object doesn't play nice with the API yet.

    // The modal will not close when you submit because we want it to wait for a successful auth request before closing it.  If we don't get a status 200 back then we'll display an error message -- work on this later
    console.log('Signin form submitted');
    console.log('email: ' + emailVal);
    console.log('password: ' + passwordVal);
  }

  return (
    <form>
      <div className='modal-body'>
        <FormInput labelTitle='Email' type='email' placeholder='Enter your email' value={emailVal} onChange={setEmailVal} />
        <FormInput labelTitle='Password' type='password' placeholder='Enter your password' value={passwordVal} onChange={setPasswordVal} />
      </div>
      <button type='button' className='btn btn-link' onClick={props.toggleModalType}>{props.changeTypeBtnText}</button>
      <div className='modal-footer'>
        <button type='submit' className='btn btn-primary' onClick={authSubmit}>Submit</button>
      </div>
    </form>
  );
}

export default SigninForm;