import React, { useState, useEffect } from 'react';
import './authModal.css';

import Modal from 'react-modal';

import Pubsub from '../../utilities/pubsub';
import NOTIF from '../../utilities/constants';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

function AuthModal(props) {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [emailVal, setEmailVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');

  useEffect(() => {
    Pubsub.subscribe(NOTIF.MODAL_TOGGLE, this, handleModalToggle);

    return (() => {
      Pubsub.unsubscribe(NOTIF.MODAL_TOGGLE, this);
    });
  }, []);

  const handleModalToggle = () => {
    setModalIsOpen(!modalIsOpen);
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

  const authSubmit = (event) => {
    event.preventDefault();

    // @TODO send to auth sign in/up
    console.log('auth credentials (not yet) submitted');
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Auth Modal'
    >
      <label>Email:</label>
      <input type='text' value={emailVal} placeholder='Email Address' onChange={handleEmailChange}></input>
      <label>Password</label>
      <input type='password' value={passwordVal} placeholder='Password' onChange={handlePasswordChange}></input>
      <input type='submit' onSubmit={authSubmit}>Submit</input>
    </Modal>
  )
}

export default AuthModal;