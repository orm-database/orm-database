import React, { useState, useEffect } from 'react';
import './chatInput.css';

import Data from '../../utilities/data';
import Auth, { user } from '../../utilities/auth';
import Pubsub from '../../utilities/pubsub';
import { NOTIF } from '../../utilities/constants';

function ChatInput(props) {
  /* props = {
    selectedGroupId: Number - group_id of the chat group
  } */

  const [messageText, setMessageText] = useState('');

  const handleTextInput = (event) => {
    setMessageText(event.target.value);
  }

  const sendMessage = (event) => {
    event.preventDefault();
    if (props.selectedGroupId !== '') {
      let channel_id = props.selectedGroupId.match(/\d+/)[0];
      let messageObj = {
        message_text: messageText,
        channel_id: channel_id
      };
      Data.sendMessage(messageObj).then(newMessageId => {
        Data.emitSocketMessage(newMessageId);
        setMessageText('');
      }).catch(error => {
        console.log(error);
      });
    } else {
      alert('please select a channel to send a message');
      console.log('props.selectedGroupId empty');
    }
  }

  return (
    <form>
      <div className='input-group mb-3'>
        <input type='text' className='form-control' value={messageText} onChange={handleTextInput} placeholder='Send message' aria-label='Chat Message'></input>
        <div className='input-group-append'>
          <input className='btn btn-primary' type='submit' onClick={sendMessage} id='button-addon2' value={'Send'}></input>
        </div>
      </div>
    </form>

  );
}

export default ChatInput;