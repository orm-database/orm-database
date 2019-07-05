import React from 'react';
import './chatContent.css';

import ChatInput from '../chatInput/chatInput';
import ChatView from '../chatView/chatView';

function ChatContent(props) {
  /* props = {
    selectedGroupId: Number - group_id of the chat group
  } */

  return (
    <div className='col-xl-10 col-lg-9 col-md-8 col-sm-7 d-flex flex-column justify-content-end chat-view'>
      <ChatView selectedGroupId={props.selectedGroupId} />

      <ChatInput selectedGroupId={props.selectedGroupId} />
    </div>
  );
}

export default ChatContent;