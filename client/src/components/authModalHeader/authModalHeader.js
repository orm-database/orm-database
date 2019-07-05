import React from 'react';
import './authModalHeader.css';

function AuthModalHeader(props) {
  /* props = {
    modalType: String - text to display the the top of the modal
    closeModal: Function - calls the parent component's "close" function
  } */

  return (
    <div className='modal-header'>
      <h5 className='modal-title'>{props.modalType}</h5>
      <button type='button' className='close' onClick={props.closeModal}>
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  )
}

export default AuthModalHeader;