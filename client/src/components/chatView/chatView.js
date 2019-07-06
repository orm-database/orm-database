import React, { useState, useEffect, useRef } from 'react';
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

  const messagesEndRef = useRef(null);

  const [authenticated, setAuthenticated] = useState(false);
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
    if (authenticated) {
      console.log(authenticated);
      callFetchMessages()
    }
  }, [props.selectedGroupId]);

  useEffect(() => {
    if (prevMessageId !== null) {
      Data.fetchMessageById(prevMessageId).then(response => {
        let messages = JSON.parse(JSON.stringify(messageList));
        response[0].message_id = prevMessageId;
        messages.push(response[0]);
        setMessageList(messages);
        console.log(messages);
        console.log(response);
      }).catch(error => {
        console.log(error);
      });
    }
  }, [prevMessageId]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const handleSignin = () => {
    // Not sure this needs to be here
    setAuthenticated(true);
  }

  const handleSignout = () => {
    setAuthenticated(false);
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
    let groupId = props.selectedGroupId.replace(/^\D+/g, '');

    // if (groupType === 'channel' && groupId >= 0) {
    if (groupType === 'channel' && groupId >= 0) {
      Data.getChannelMessages(groupId);
    } else {
      console.log('download direct messages');
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  const generateMessages = () => {
    if (messageList.length) {
      const messages = messageList.map((message, index) => {
        let timestamp = formatMessageTimestamp(message.message_time);
        if (window.innerWidth <= 575) {
          timestamp = '';
        }
        return (
          <MessageItem
            author={message.alias || 'unknown'}
            timestamp={timestamp || ''}
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
      <li style={{ float: "left", clear: "both" }}
        ref={messagesEndRef}>
      </li>
    </ul>
  );
}

export default ChatView;