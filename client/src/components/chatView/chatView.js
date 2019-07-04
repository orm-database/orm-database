import React, { useState, useEffect } from 'react';
import './chatView.css';

import MessageItem from '../messageItem/messageItem';

import Data, { CurrentChannelMessages } from '../../utilities/data';
import Pubsub from '../../utilities/pubsub';
import { NOTIF } from '../../utilities/constants';
import { formatMessageTimestamp } from '../../utilities/helper';

function ChatView(props) {
  /* props = {
    selectedGroupId: Number - group_id of the chat group
  } */

  const [prevMessageId, setPrevMessageId] = useState(null);
  const [messageList, setMessageList] = useState([]);

  // @TODO fetch all messages in the group given by props.selectedGroupId

  useEffect(() => {
    Pubsub.subscribe(NOTIF.SIGN_IN, this, handleSignin);
    Pubsub.subscribe(NOTIF.SIGN_OUT, this, handleSignout);
    Pubsub.subscribe(NOTIF.MESSAGES_RECEIVED, this, handleNewMessages);

    return (() => {
      Pubsub.unsubscribe(NOTIF.SIGN_IN, this);
      Pubsub.unsubscribe(NOTIF.SIGN_OUT, this);
      Pubsub.unsubscribe(NOTIF.MESSAGES_RECEIVED, this);
    });
  }, []);

  useEffect(() => {
    callFetchMessages()
  }, [props.selectedGroupId]);

  useEffect(() => {
    if (prevMessageId !== null) {
      Data.fetchMessageById(prevMessageId).then(response => {
        let messages = JSON.parse(JSON.stringify(messageList));
        messages.push(response[0]);
        setMessageList(messages);
        console.log(messages);
        console.log(response);
      }).catch(error => {
        console.log(error);
      });
    }
  }, [prevMessageId]);

  const handleSignin = () => {
    // Not sure this needs to be here
  }

  const handleSignout = () => {
    setMessageList([]);
  }

  const handleNewMessages = (newMessageId) => {
    if (newMessageId) {
      console.log('new message from socket.io: ' + newMessageId);
      // @TODO API request to get the new message by ID
      setPrevMessageId(newMessageId);
    } else {
      let messages = CurrentChannelMessages;
      setMessageList(messages);
    }
  }

  const callFetchMessages = () => {
    let groupType = props.selectedGroupId.indexOf('channel') >= 0 ? 'channel' : 'direct';
    let groupId = props.selectedGroupId.replace( /^\D+/g, '');

    // if (groupType === 'channel' && groupId >= 0) {
    if (groupType === 'channel') { // FOR TESTING ONLY - the above line will be used when everything gets set up properly
      Data.fetchMessages(groupId);
    } else {
      console.log('download direct messages');
    }
  }

  const generateMessages = () => {
    if (messageList.length) {
      const messages = messageList.map((message, index) => {
        return (
          <MessageItem 
            author={message.alias || 'unknown'} 
            timestamp={formatMessageTimestamp(message.message_time) || ''} 
            content={message.message_text} 
            key={message.message_id || index} 
          />
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