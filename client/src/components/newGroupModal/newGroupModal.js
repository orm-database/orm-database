import React, { useState, useEffect } from 'react';
import './newGroupModal.css';

import Modal from 'react-modal';

import Data from '../../utilities/data';
import Pubsub from '../../utilities/pubsub';
import { NOTIF, GROUP_MODAL_TYPES } from '../../utilities/constants';
import Auth, { user } from '../../utilities/auth';

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
  const [directRecipientVal, setDirectRecipientVal] = useState('');

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

  const handleDirectRecipientChange = (event) => {
    setDirectRecipientVal(event.target.value);
  }

  const addChannelSubmit = () => {
    let params = {
      channel_name: channelNameVal
    };
    Data.createChannel(params).then(response => {
      let channel_id = response.channel_id;
      console.log(user);
      if ((channel_id || channel_id == 0) && user.user_id) {
        let joinObj = {
          channel_id: channel_id,
          users: [user.user_id]
        }
        Data.joinChannel(joinObj);
      } else {
        console.log('error joining channel');
        console.log(channel_id, user);
      } 
    });
  }

  const sendDirectMessageSubmit = () => {
    let params = {

    };
    // @TODO send to Data.[send direct message]
  }

  const generateErrorInfo = () => {
    return null;
  }

  // @TODO break down this component into more
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='New Group'
      ariaHideApp={false}
    >
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
              <div className='form-group mt-4'>
                <input type='text' className='form-control' value={channelNameVal} onChange={handleChannelNameChange} placeholder='Enter Channel Name'></input>
              </div>
              <div className='d-flex justify-content-between'>
                <button type='button' className='btn btn-primary' onClick={addChannelSubmit}>Add Channel</button>
                <button type='button' className='btn btn-secondary' onClick={closeModal}>Close</button>
              </div>
            </form>
          </div>
          <div role='tabpanel' className='tab-pane fade' id='newdirect'>
            <form>
              <div className='form-group mt-4'>
                <input type='text' className='form-control' value={directRecipientVal} onChange={handleDirectRecipientChange} placeholder={'Enter Recipient\'s Name'}></input>
              </div>
              <div className='d-flex justify-content-between'>
                <button type='button' className='btn btn-primary' onClick={sendDirectMessageSubmit}>Send Message</button>
                <button type='button' className='btn btn-secondary' onClick={closeModal}>Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default NewGroupModal;