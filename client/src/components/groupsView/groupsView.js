import React from 'react';
import './groupsView.css';

import ChatListGroup from '../chatListGroup/chatListGroup';

function GroupsView(props) {
  /* props = {
    selectedGroupId: Number - group_id of the chat group
  } */

  // @TODO will likely need to add logic to distinguish between channels group and direct group
  return (
    <div className='col-lg-2 p-0 group-menu'>
      <div className='channels-container mt-1 mb-4'>
        <span>Channels</span>
        <ChatListGroup selectedGroupId={props.selectedGroupId} />
      </div>
      
      <div className='direct-container mt-1 mb-4'>
        <span>Direct Messages</span>
        <ChatListGroup selectedGroupId={props.selectedGroupId} />
      </div>
    </div>
  );
}

export default GroupsView;