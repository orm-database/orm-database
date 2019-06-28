import React, { useState, useEffect } from 'react';
import './authModal.css';

import Modal from 'react-modal';

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

  const [emailVal, setEmailVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [confirmPasswordVal, setConfirmPasswordVal] = useState('');

  useEffect(() => {
    Pubsub.subscribe(NOTIF.MODAL_TOGGLE, this, handleModalToggle);

    return (() => {
      Pubsub.unsubscribe(NOTIF.MODAL_TOGGLE, this);
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

    // @TODO send to auth sign in/up and close the modal if returns a success
    console.log('auth credentials (not yet) submitted');
    console.log(emailVal, passwordVal, confirmPasswordVal);
    Auth.sendSignupRequest(emailVal, passwordVal, confirmPasswordVal);
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