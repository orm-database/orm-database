import React, { useState, useEffect } from 'react';
import './chatInput.css';

import Data from '../../utilities/data';
import Auth, { user } from '../../utilities/auth';

function ChatInput(props) {
  /* props = {
    selectedGroupId: Number - group_id of the chat group
  } */

  const [messageText, setMessageText] = useState('');

  const handleTextInput = (event) => {
    setMessageText(event.target.value);
  }

  const sendMessage = () => {
    if (props.selectedGroupId !== '') {
      let messageObj = {
        message_text: messageText
      };
      Data.sendMessage(messageObj).then(newMessageId => {
        Data.emitSocketMessage(newMessageId);
      }).catch(error => {
        console.log(error);
      });
    } else {
      alert('please select a channel to send a message');
      console.log('props.selectedGroupId empty');
    }
  }

  return (
    <div className='input-group mb-3'>
      <input type='text' className='form-control' value={messageText} onChange={handleTextInput} placeholder='Send message' aria-label='Chat Message'></input>
      <div className='input-group-append'>
        <button className='btn btn-primary' type='button' onClick={sendMessage} id='button-addon2'>Send</button>
      </div>
    </div>
  );
}

export default ChatInput;