import React, { useState } from 'react';
import './signupForm.css';

import Auth from '../../utilities/auth';

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
        {/* fill in form contents similar to how you did for signinForm */}
        {/* First Name */}
        <div firstName='form-group'>
          <label>First Name</label>
          <input type='first-name' className='form-control' placeholder='Enter first name' value={firstNameVal} onChange={handleFirstNameChange}></input>
        </div>
        {/* Last Name */}
        <div className='form-group'>
          <label>Last Name</label>
          <input type='last-name' className='form-control' placeholder='Enter last name' value={lastNameVal} onChange={handleLastNameChange}></input>
        </div>
        {/* Username */}
        <div className='form-group'>
          <label>Username</label>
          <input type='username' className='form-control' placeholder='Enter username' value={usernameVal} onChange={handleUsernameChange}></input>
        </div>
        {/* Email */}
        <div className='form-group'>
          <label>Email Address</label>
          <input type='email' className='form-control' placeholder='Enter email' value={emailVal} onChange={handleEmailChange}></input>
        </div>
        {/* Password */}
        <div className='form-group'>
          <label>Password</label>
          <input type='password' className='form-control' placeholder='Enter password' value={passwordVal} onChange={handlePasswordChange}></input>
        </div>
        {/* Confirm Password */}
        <div className='form-group'>
          <label>Confirm Password</label>
          <input type='confirm-password' className='form-control' placeholder='Confirm password' value={confirmPasswordVal} onChange={handleConfirmPasswordChange}></input>
        </div>
      </div>

      {/* LEAVE THE BELOW HTML AS IS */}
      <button type='button' className='btn btn-link' onClick={props.toggleModalType}>{props.changeTypeBtnText}</button>
      <div className='modal-footer'>
        <button type='submit' className='btn btn-primary' onClick={authSubmit}>Submit</button>
      </div>
    </form>
  );
}

export default SignupForm;