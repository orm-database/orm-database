import React from 'react';
import './groupsView.css';

import ChatListGroup from '../chatListGroup/chatListGroup';

import { CHAT_GROUP_TYPES } from '../../utilities/constants';

function GroupsView(props) {
  /* props = {
    selectedGroupId: Number - group_id of the chat group
  } */

  // @TODO will likely need to add logic to distinguish between channels group and direct group
  return (
    <div className='col-lg-2 p-0 group-menu scrollable'>
      <div className='channels-container mt-1 mb-4'>
        <h5 className='pl-2 text-light'>Channels</h5>
        <ChatListGroup groupType={CHAT_GROUP_TYPES.group} selectedGroupId={props.selectedGroupId} />
      </div>
      
      <div className='direct-container mt-1 mb-4'>
        <h5 className='pl-2 text-light'>Direct Messages</h5>
        <ChatListGroup groupType={CHAT_GROUP_TYPES.direct} selectedGroupId={props.selectedGroupId} />
      </div>
    </div>
  );
}

export default GroupsView;