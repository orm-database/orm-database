import React, { useState } from 'react';
import './signupForm.css';

import Auth from '../../utilities/auth';
import FormInput from '../formInput/formInput';

function SignupForm(props) {
  /* props = {
    toggleModalType: Function that calls the parent toggleModalType function
    changeTypeBtnText: Text to display in the button above the submit button, i.e. "Already have an account?"
  } */

  // Declare your local state variables with the useState hook

  const [firstNameVal, setFirstNameVal] = useState('');
  const [lastNameVal, setLastNameVal] = useState('');
  const [usernameVal, setUsernameVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [confirmPasswordVal, setConfirmPasswordVal] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstNameVal(event.target.value);
  }
  const handleLastNameChange = (event) => {
    setLastNameVal(event.target.value);
  }
  const handleUsernameChange = (event) => {
    setUsernameVal(event.target.value);
  }
  const handleEmailChange = (event) => {
    setEmailVal(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPasswordVal(event.target.value);
  }
  const handleConfirmPasswordChange = (event) => {
    setConfirmPasswordVal(event.target.value);
  }

  const authSubmit = () => {
    // Eventually send to Auth.sendSignupRequest, but that functions isn't properly configured yet.
    // Just worry about getting this function to fire and console.log all of the pertinent information

    console.log('Signup form submitted');
    console.log('first name: ' + firstNameVal);
    console.log('last name: ' + lastNameVal);
    console.log('username: ' + usernameVal);
    console.log('email: ' + emailVal);
    console.log('password: ' + passwordVal);
    console.log('confirmed password: ' + confirmPasswordVal);
  }

  return (
    <form>
      <div className='modal-body'>
        <FormInput labelTitle='First Name' type='text' placeholder='First Name' value={firstNameVal} onChange={setFirstNameVal} />
        <FormInput labelTitle='Last Name' type='text' placeholder='Last Name' value={lastNameVal} onChange={setLastNameVal} />
        <FormInput labelTitle='Username' type='text' placeholder='Username' value={usernameVal} onChange={setUsernameVal} />
        <FormInput labelTitle='Email' type='email' placeholder='Email' value={emailVal} onChange={setEmailVal} />
        <FormInput labelTitle='Password' type='password' placeholder='Password' value={passwordVal} onChange={setPasswordVal} />
        <FormInput labelTitle='Confirm Password' type='password' placeholder='Confirm password' value={confirmPasswordVal} onChange={setConfirmPasswordVal} />
      </div>
      <button type='button' className='btn btn-link' onClick={props.toggleModalType}>{props.changeTypeBtnText}</button>
      <div className='modal-footer'>
        <button type='submit' className='btn btn-primary' onClick={authSubmit}>Submit</button>
      </div>
    </form>
  );
}

export default SignupForm;