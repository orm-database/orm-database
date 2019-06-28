import React, { useState } from 'react';
import './signupForm.css';

import Auth from '../../utilities/auth';

function SignupForm(props) {
  /* props = {
    toggleModalType: Function that calls the parent toggleModalType function
    changeTypeBtnText: Text to display in the button above the submit button, i.e. "Already have an account?"
  } */

  // Declare your local state variables with the useState hook

  const authSubmit = () => {
    // Eventually send to Auth.sendSignupRequest, but that functions isn't properly configured yet.
    // Just worry about getting this function to fire and console.log all of the pertinent information
  }

  return (
    <form>
      <div className='modal-body'>
        {/* fill in form contents similar to how you did for signinForm */}
        {/* First Name */}
        {/* Last Name */}
        {/* Username */}
        {/* Email */}
        {/* Password */}
        {/* Confirm Password */}
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