import React, { useState, useEffect } from 'react';
import './newGroupModal.css';

import Modal from 'react-modal';

import Data from '../../utilities/data';
import Pubsub from '../../utilities/pubsub';
import { NOTIF, GROUP_MODAL_TYPES } from '../../utilities/constants';

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

function NewGroupModal(props) {

  const [modalType, setModalType] = useState(GROUP_MODAL_TYPES.group);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [channelNameVal, setChannelNameVal] = useState('');

  const closeModal = () => {
    setModalIsOpen(false);
  }

  useEffect(() => {
    Pubsub.subscribe(NOTIF.GROUP_MODAL_TOGGLE, this, handleModalToggle);

    return (() => {
      Pubsub.unsubscribe(NOTIF.GROUP_MODAL_TOGGLE, this);
    });
  }, []);

  const handleModalToggle = (data) => {
    setModalIsOpen(!modalIsOpen);
  }

  const handleChannelNameChange = (event) => {
    setChannelNameVal(event.target.value);
  }

  const addChannelSubmit = () => {
    let params = {
      channel_name: channelNameVal
    };
    Data.createChannel(params);
  }

  const generateErrorInfo = () => {
    return null;
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='New Group'
      ariaHideApp={false}
    >
      <div className='modal-header'>
        <h5 className='modal-title'>Add New Group</h5>
        <button type='button' className='close' onClick={closeModal}>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <div className='error-info'>
        {generateErrorInfo()}
      </div>
      <div className='modal-body'>
        <ul className='nav nav-tabs' role='tablist'>
          <li className='nav-item'>
            <a className='nav-link active' href='#newgroup' role='tab' data-toggle='tab'>New Channel</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#newdirect' role='tab' data-toggle='tab'>New Direct Message</a>
          </li>
        </ul>

        <div className='tab-content'>
          <div role='tabpanel' className='tab-pane fade in active show' id='newgroup'>
            <form>
              <div className='form-group'>
                <label>Channel Name</label>
                <input type='text' className='form-control' value={channelNameVal} onChange={handleChannelNameChange} placeholder='Enter Channel Name'></input>
              </div>
              <button type='button' className='btn btn-primary' onClick={addChannelSubmit}>Add Channel</button>
            </form>
          </div>
          <div role='tabpanel' className='tab-pane fade' id='newdirect'>
            New Direct Test
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default NewGroupModal;