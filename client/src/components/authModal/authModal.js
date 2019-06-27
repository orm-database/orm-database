import React, { useState, useEffect } from 'react';
import './authModal.css';

import Modal from 'react-modal';

import Auth from '../../utilities/auth';
import Pubsub from '../../utilities/pubsub';
import { NOTIF } from '../../utilities/constants';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
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

    // @TODO send to auth sign in/up and close the modal if returns a success
    console.log('auth credentials (not yet) submitted');
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
        <h5 className='modal-title'>Sign In</h5>
        <button type='button' className='close' onClick={closeModal}>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <form>
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
        <div className='modal-footer'>
          <button type='submit' className='btn btn-primary' onClick={authSubmit}>Submit</button>
        </div>
      </form>
    </Modal>
  )
}

export default AuthModal;