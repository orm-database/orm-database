import React, { useState, useEffect } from 'react';
import './chatView.css';

import MessageItem from '../messageItem/messageItem';

import Data from '../../utilities/data';
import Pubsub from '../../utilities/pubsub';
import { NOTIF } from '../../utilities/constants';

function ChatView(props) {
  /* props = {
    selectedGroupId: Number - group_id of the chat group
  } */

  const [messageList, setMessageList] = useState([]);

  // @TODO fetch all messages in the group given by props.selectedGroupId

  useEffect(() => {
    Pubsub.subscribe(NOTIF.SIGN_IN, this, handleSignin);
    Pubsub.subscribe(NOTIF.SIGN_OUT, this, handleSignout);

    return (() => {
      Pubsub.unsubscribe(NOTIF.SIGN_IN, this);
      Pubsub.unsubscribe(NOTIF.SIGN_OUT, this);
    });
  }, []);

  useEffect(() => {
    callFetchMessages()
  }, [props.selectedGroupId]);

  const handleSignin = () => {
    // Not sure this needs to be here
  }

  const handleSignout = () => {
    setMessageList([]);
  }

  const callFetchMessages = () => {
    let groupType = props.selectedGroupId.indexOf('channel') >= 0 ? 'channel' : 'direct';
    let groupId = props.selectedGroupId.replace( /^\D+/g, '');

    if (groupType === 'channel' && groupId >= 0) {
      Data.fetchMessages(groupId);
    } else {
      console.log('download direct messages');
    }
  }

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