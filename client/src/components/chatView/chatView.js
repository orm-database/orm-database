import React, { useState, useEffect } from 'react';
import './chatView.css';

import MessageItem from '../messageItem/messageItem';

import Data from '../../utilities/data';

function ChatView(props) {
  /* props = {
    selectedGroupId: Number - group_id of the chat group
  } */

  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    // @TODO fetch all messages in the group given by props.selectedGroupId
    // TEST DATA
    
  }, []);

  const generateMessages = () => {
    if (messageList.length) {
      const messages = messageList.map((message, index) => {
        return (
          <MessageItem author={message.author} timestamp={message.timestamp} content={message.text} key={index} />
        );
      });

      return (messages);
    } else {
      return null;
    }
  }


  return (
    <ul className='list-group list-group-flush scrollable'>
      {generateMessages()}
    </ul>
  );
}

export default ChatView;