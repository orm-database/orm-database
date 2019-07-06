import React, { useState, useEffect, useRef } from 'react';
import './newDirectMessageModal.css';

import Modal from 'react-modal';

import Data from '../../utilities/data';
import Pubsub from '../../utilities/pubsub';
import { NOTIF, GROUP_MODAL_TYPES } from '../../utilities/constants';
import Auth, { user } from '../../utilities/auth';
import UserListItem from '../userListItem/userListItem';

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

function NewDirectMessageModal(props) {

  const [modalType, setModalType] = useState(GROUP_MODAL_TYPES.group);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const modalOpen = useRef(modalIsOpen);

  //const [userNameVal, setChannelNameVal] = useState('');

  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  const closeModal = () => {
    setModalIsOpen(false);
    modalOpen.current = false;
  }

  useEffect(() => {
    Pubsub.subscribe(NOTIF.DIRECT_MESSAGE_MODAL_TOGGLE, this, handleModalToggle);
    Pubsub.subscribe(NOTIF.DIRECT_MESSAGE_USERS_DOWNLOADED, this, handleAllUsersDownload);

    return (() => {
      Pubsub.unsubscribe(NOTIF.DIRECT_MESSAGE_MODAL_TOGGLE, this);
      Pubsub.unsubscribe(NOTIF.DIRECT_MESSAGE_USERS_DOWNLOADED, this);    
    });
  }, []);

  useEffect(() => {
    if (modalIsOpen) {
      Data.getAllUsers();
    } else {
      setUserList([]);
    }
  }, [modalIsOpen])

  const handleModalToggle = (data) => {
    console.log(modalOpen);
    setModalIsOpen(!modalOpen.current);
    modalOpen.current = !modalOpen.current;
  }

  const handleAllUsersDownload = (data) => {
      console.log(data);
    setUserList(data);
  }

//   const handleChannelNameChange = (event) => {
//     setChannelNameVal(event.target.value);
//   }

//   const handleDirectRecipientChange = (event) => {
//     setDirectRecipientVal(event.target.value);
//   }

  const generateUserList = () => {
      console.log('generate user is called');

    if (userList.length) {
      let list = userList.map(user => {
        //let active = selectedUserId == user.user_id;
        return (
          <UserListItem
            user_id={user.user_id}
            user_first_name={user.first_name}
            user_last_name={user.last_name}
            // type={CHAT_GROUP_TYPES.channel}
            // name={channel.channel_name}
            // unreadCount={0}
            dark={true}
            // active={active}
            // onSelect={handleChannelSelection}
            // group_id={channel.channel_id}
            key={user.user_id}
          />
        );
      });
        console.log(list);
      return (list);
    } else {
        console.log('didnt run')
      return null;
    }
  }

  const addDirectMessageSubmit = () => {
      console.log('direct message submit')

    // let params = {
    //   channel_name: channelNameVal
    // };
    // Data.createDirectMessage(params).then(response => {
    //   let channel_id = response.channel_id;
    //   console.log(user);
    //   if ((channel_id || channel_id == 0) && user.user_id) {
    //     let joinObj = {
    //       channel_id: channel_id,
    //       users: [user.user_id]
    //     }
    //     Data.joinChannel(joinObj);
    //   } else {
    //     console.log('error creating direct message');
    //     console.log(channel_id, user);
    //   } 
    // });
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
            <a className='nav-link active' href='#sendDirectMessage' role='tab' data-toggle='tab'>Select User</a>
          </li>
        </ul>
        <div className='list-group my-2'>
          {generateUserList()}
            user list goes here
        </div>
        <div className='d-flex justify-content-between'>
            <button type='button' className='btn btn-primary' onClick={addDirectMessageSubmit}>Send Direct Message</button>
            <button type='button' className='btn btn-secondary' onClick={closeModal}>Close</button>
      </div>
      </div>
    </Modal>
  )
}

export default NewDirectMessageModal;