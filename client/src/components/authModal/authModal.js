import React, { useState, useEffect } from 'react';
import './authModal.css';

import Modal from 'react-modal';
import AuthModalHeader from '../authModalHeader/authModalHeader';
import SigninForm from '../signinForm/signinForm';
import SignupForm from '../signupForm/signupForm';

import Auth from '../../utilities/auth';
import Pubsub from '../../utilities/pubsub';
import { NOTIF, AUTH_MODAL_TYPES } from '../../utilities/constants';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '350px'
  }
};

const changeTypeBtnTextValues = {
  signin: 'Don\'t have an account?',
  signup: 'Already have an account?'
};

function AuthModal() {

  const [modalType, setModalType] = useState(AUTH_MODAL_TYPES.signin);
  const [changeTypeBtnText, setChangeTypeBtnText] = useState(changeTypeBtnTextValues.signin);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [firstNameVal, setFirstNameVal] = useState('');
  const [lastNameVal, setLastNameVal] = useState('');
  const [usernameVal, setUsernameVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [confirmPasswordVal, setConfirmPasswordVal] = useState('');

  useEffect(() => {
    Pubsub.subscribe(NOTIF.MODAL_TOGGLE, this, handleModalToggle);
    Pubsub.subscribe(NOTIF.SIGN_IN, this, closeModal);

    return (() => {
      Pubsub.unsubscribe(NOTIF.MODAL_TOGGLE, this);
      Pubsub.unsubscribe(NOTIF.SIGN_IN, this);
    });
  }, []);

  const handleModalToggle = (type) => {
    if (type === AUTH_MODAL_TYPES.signin) {
      setModalType(AUTH_MODAL_TYPES.signin);
      setChangeTypeBtnText(changeTypeBtnTextValues.signin);
    } else if (type === AUTH_MODAL_TYPES.signup) {
      setModalType(AUTH_MODAL_TYPES.signup);
      setChangeTypeBtnText(changeTypeBtnTextValues.signup);
    }

    setModalIsOpen(!modalIsOpen);
  }

  // works while there are only two types - will need more robust logic for more types
  const toggleModalType = () => {
    let newModalType = modalType === AUTH_MODAL_TYPES.signin ? AUTH_MODAL_TYPES.signup : AUTH_MODAL_TYPES.signin;
    let newChangeBtnText = modalType === AUTH_MODAL_TYPES.signin ? changeTypeBtnTextValues.signup : changeTypeBtnTextValues.signin;

    setModalType(newModalType);
    setChangeTypeBtnText(newChangeBtnText);
  }

  // shouldn't be necessary to have a separate close function instead of sending it to the toggle function, but keeping it for assurity (sp?)
  const closeModal = () => {
    setModalIsOpen(false);
  }

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
    // @TODO implement live validation
    setEmailVal(event.target.value);
  }

  const handlePasswordChange = (event) => {
    // @TODO implement live validation
    setPasswordVal(event.target.value);
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPasswordVal(event.target.value);
  }

  const authSubmit = (event) => {
    event.preventDefault();

    if (modalType === AUTH_MODAL_TYPES.signin) {
      let signinObj = {
        email_address: emailVal,
        password: passwordVal
      };

      Auth.sendSigninRequest(signinObj);
    } else if (modalType === AUTH_MODAL_TYPES.signup) {
      let signupObj = {
        first_name: firstNameVal,
        last_name: lastNameVal,
        alias: usernameVal,
        email: emailVal,
        password: passwordVal,
        password_confirm: confirmPasswordVal 
      };

      Auth.sendSignupRequest(signupObj);
    }
  }

  const generateFormContents = () => {
    if (modalType === AUTH_MODAL_TYPES.signin) {
      return (
        <div className='modal-body'>
          <div className='form-group'>
            <label>Email Address</label>
            <input type='email' className='form-control' placeholder='Enter email' value={emailVal} onChange={handleEmailChange}></input>
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input type='password' className='form-control' placeholder='Password' value={passwordVal} onChange={handlePasswordChange}></input>
          </div>
        </div>
      );
    } else if (modalType === AUTH_MODAL_TYPES.signup) {
      return (
        <div className='modal-body'>
          <div className='form-group'>
            <label>First Name</label>
            <input type='email' className='form-control' placeholder='First Name' value={firstNameVal} onChange={handleFirstNameChange}></input>
          </div>
          <div className='form-group'>
            <label>Last Name</label>
            <input type='email' className='form-control' placeholder='Last Name' value={lastNameVal} onChange={handleLastNameChange}></input>
          </div>
          <div className='form-group'>
            <label>Username</label>
            <input type='email' className='form-control' placeholder='Username' value={usernameVal} onChange={handleUsernameChange}></input>
          </div>
          <div className='form-group'>
            <label>Email Address</label>
            <input type='email' className='form-control' placeholder='Enter email' value={emailVal} onChange={handleEmailChange}></input>
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input type='password' className='form-control' placeholder='Password' value={passwordVal} onChange={handlePasswordChange}></input>
          </div>
          <div className='form-group'>
            <label>Confirm Password</label>
            <input type='password' className='form-control' placeholder='Password' value={confirmPasswordVal} onChange={handleConfirmPasswordChange}></input>
          </div>
        </div>
      )
    } else {
      console.log('error in authModal type: ' + modalType);
    }
  }

  const generateErrorInfo = () => {
    // @TODO figure out what type of error info will be sent back
    return null;
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Auth Modal'
      ariaHideApp={false}
    >
      <div className='modal-header'>
        <h5 className='modal-title'>{modalType}</h5>
        <button type='button' className='close' onClick={closeModal}>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <div className='error-info'>
        {generateErrorInfo()}
      </div>
      <form>
        {generateFormContents()}
        <button type='button' className='btn btn-link' onClick={toggleModalType}>{changeTypeBtnText}</button>
        <div className='modal-footer'>
          <button type='submit' className='btn btn-primary' onClick={authSubmit}>Submit</button>
        </div>
      </form>
    </Modal>
  )
}

export default AuthModal;