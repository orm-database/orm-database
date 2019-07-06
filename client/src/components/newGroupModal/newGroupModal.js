import React, { useState, useEffect, useRef } from 'react';
import './newGroupModal.css';

import Modal from 'react-modal';

import Data from '../../utilities/data';
import Pubsub from '../../utilities/pubsub';
import { NOTIF, GROUP_MODAL_TYPES, CHAT_GROUP_TYPES } from '../../utilities/constants';
import Auth, { user } from '../../utilities/auth';
import ChatListItem from '../chatListItem/chatListItem';

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

  const modalOpen = useRef(modalIsOpen);

  const [errorMessage, setErrorMessage] = useState('');

  const [channelNameVal, setChannelNameVal] = useState('');

  const [channelList, setChannelList] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState('');

  const closeModal = () => {
    setModalIsOpen(false);
    modalOpen.current = false;
  }

  useEffect(() => {
    Pubsub.subscribe(NOTIF.GROUP_MODAL_TOGGLE, this, handleModalToggle);
    Pubsub.subscribe(NOTIF.GROUPS_DOWNLOADED, this, handleAllGroupsDownload);

    Pubsub.subscribe(NOTIF.CHANNEL_ERROR, this, handleErrorMessage);

    return (() => {
      Pubsub.unsubscribe(NOTIF.GROUP_MODAL_TOGGLE, this);
      Pubsub.unsubscribe(NOTIF.GROUPS_DOWNLOADED, this);

      Pubsub.unsubscribe(NOTIF.CHANNEL_ERROR, this);
    });
  }, []);

  useEffect(() => {
    if (modalIsOpen) {
      Data.getAllChannels();
    } else {
      setChannelList([]);
    }
  }, [modalIsOpen])

  const handleModalToggle = (data) => {
    console.log(modalOpen);
    setModalIsOpen(!modalOpen.current);
    modalOpen.current = !modalOpen.current;
  }

  const handleErrorMessage = (errorObj) => {
    setErrorMessage(errorObj.message);
  }

  const handleAllGroupsDownload = (data) => {
    setChannelList(data);
  }

  const handleChannelNameChange = (event) => {
    setChannelNameVal(event.target.value);
  }

  const handleChannelSelection = (channelId) => {
    setSelectedChannelId(channelId);
  }

  const generateChannelList = () => {
    if (channelList.length) {
      let list = channelList.map(channel => {
        let active = selectedChannelId == channel.channel_id;
        return (
          <ChatListItem
            type={CHAT_GROUP_TYPES.channel}
            name={channel.channel_name}
            unreadCount={0}
            dark={true}
            active={active}
            onSelect={handleChannelSelection}
            group_id={channel.channel_id}
            key={channel.channel_id}
          />
        );
      });

      return (list);
    } else {
      return null;
    }
  }

  const addChannelSubmit = () => {
    setErrorMessage('');
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

  const joinChannelSubmit = () => {
    let params = {
      channel_id: selectedChannelId,
      users: [user.user_id]
    };
    Data.joinChannel(params);
  }

  const generateErrorInfo = () => {
    return (
      <span className='text-danger'>{errorMessage}</span>
    );
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
            <a className='nav-link active' href='#createChannel' role='tab' data-toggle='tab'>Create Channel</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#joinChannel' role='tab' data-toggle='tab'>Join Channel</a>
          </li>
        </ul>

        <div className='tab-content'>
          <div role='tabpanel' className='tab-pane fade in active show' id='createChannel'>
            <form>
              <div className='form-group mt-4'>
                <input type='text' className='form-control' value={channelNameVal} onChange={handleChannelNameChange} placeholder='Enter Channel Name'></input>
              </div>
              <div className='d-flex justify-content-between'>
                <button type='button' className='btn btn-primary' onClick={addChannelSubmit}>Create Channel</button>
                <button type='button' className='btn btn-secondary' onClick={closeModal}>Close</button>
              </div>
            </form>
          </div>
          <div role='tabpanel' className='tab-pane fade' id='joinChannel'>
            <div className='list-group my-2'>
              {generateChannelList()}
            </div>
            <div className='d-flex justify-content-between'>
              <button type='button' className='btn btn-primary' onClick={joinChannelSubmit}>Join Channel</button>
              <button type='button' className='btn btn-secondary' onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default NewGroupModal;