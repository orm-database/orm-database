import React from 'react';
import './groupsView.css';

import ChatListGroup from '../chatListGroup/chatListGroup';
import NewGroupModal from '../newGroupModal/newGroupModal';

import { CHAT_GROUP_TYPES, NOTIF } from '../../utilities/constants';
import Pubsub from '../../utilities/pubsub';

function GroupsView(props) {
  /* props = {
    selectedGroupId: Number - group_id of the chat group
  } */

  const addChannel = () => {
    // @TODO implement logic for adding a channel
    console.log('add channel');
    Pubsub.publish(NOTIF.GROUP_MODAL_TOGGLE, null);
  }

  const addDirectMessage = () => {
    console.log('add DM');
    Pubsub.publish(NOTIF.GROUP_MODAL_TOGGLE, null);
  }

  // @TODO will likely need to add logic to distinguish between channels group and direct group
  return (
    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-5 p-0 group-menu scrollable'>
      <div className='channels-container mt-1 mb-4'>
        <div className='list-group-header d-flex justify-content-between'>
          <h5 className='pl-2 text-light'>Channels</h5>
          <button type='button' className='add-btn' onClick={addChannel}></button>
        </div>
        
        <ChatListGroup groupType={CHAT_GROUP_TYPES.group} selectedGroupId={props.selectedGroupId} />
      </div>
      
      <div className='direct-container mt-1 mb-4'>
        <div className='list-group-header d-flex justify-content-between'>
          <h5 className='pl-2 text-light'>Direct Messages</h5>
          <button type='button' className='add-btn' onClick={addDirectMessage}></button>
        </div>
        <ChatListGroup groupType={CHAT_GROUP_TYPES.direct} selectedGroupId={props.selectedGroupId} />
      </div>

      <NewGroupModal />
    </div>
  );
}

export default GroupsView;