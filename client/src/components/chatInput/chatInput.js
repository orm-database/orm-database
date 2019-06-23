import React, { useState, useEffect } from 'react';
import './chatInput.css';

function ChatInput(props) {
  /* props = {
    selectedGroupId: Number - group_id of the chat group
  } */

  const [messageText, setMessageText] = useState(null);

  const handleTextInput = (event) => {
    setMessageText(event.target.value);
  }

  const sendMessage = () => {
    // @TODO send to api endpoint using props.selectedGroupId and reset messageText on success
  }

  return (
    <div className='input-group mb-3'>
      <input type='text' className='form-control' value={messageText} onChange={handleTextInput} placeholder='Send message' aria-label='Chat Message'></input>
      <div class='input-group-append'>
        <button class='btn btn-primary' type='button' onClick={sendMessage} id='button-addon2'>Send</button>
      </div>
    </div>
  );
}

export default ChatInput;