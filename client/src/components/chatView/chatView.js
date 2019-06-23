import React, { useState, useEffect } from 'react';
import './chatView.css';

import MessageItem from '../messageItem/messageItem';

function ChatView(props) {
  /* props = {
    selectedGroupId: Number - group_id of the chat group
  } */

  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    // @TODO fetch all messages in the group given by props.selectedGroupId
    // TEST DATA
    let messages = [{
      author: 'Chris',
      timestamp: '9:30 am',
      text: 'Good morning everyone'
    },
    {
      author: 'Nigel',
      timestamp: '9:32 am',
      text: 'Good morning Chris'
    },
    {
      author: 'Daniel',
      timestamp: '9:35 am',
      text: 'How is everyone\'s weekend going?'
    },
    {
      author: 'Justin',
      timestamp: '9:37 am',
      text: 'Pretty good'
    }
  ];

  setMessageList(messages);
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