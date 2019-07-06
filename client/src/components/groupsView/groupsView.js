import React, { useState, useEffect, useRef } from 'react';
import './groupsView.css';

import ChannelList from '../channelList/channelList';
import DirectList from '../directList/directList';
import NewGroupModal from '../newGroupModal/newGroupModal';

import { CHAT_GROUP_TYPES, NOTIF } from '../../utilities/constants';
import Pubsub from '../../utilities/pubsub';

function GroupsView(props) {
  /* props = {
    selectedGroupId: Number - group_id of the chat group
  } */
  const menuDisplay = useRef(false);
  const [groupMenuClass, setGroupMenuClass] = useState('col-xl-2 col-lg-3 col-md-4 col-sm-5 p-0 group-menu scrollable');

  useEffect(() => {
    Pubsub.subscribe(NOTIF.TOGGLE_SIDEBAR_MOBILE, this, handleSidebarToggle);

    return (() => {
      Pubsub.unsubscribe(NOTIF.TOGGLE_SIDEBAR_MOBILE, this);
    });
  }, []);

  const handleSidebarToggle = () => {
    if (window.innerWidth <= 575) {
      if (menuDisplay.current) {
        setGroupMenuClass('col-xl-2 col-lg-3 col-md-4 col-sm-5 p-0 group-menu scrollable');
        menuDisplay.current = false;
      } else {
        setGroupMenuClass('col-xl-2 col-lg-3 col-md-4 col-sm-5 p-0 group-menu group-menu-show scrollable');
        menuDisplay.current = true;
      }
    }
  }

  const addChannel = () => {
    // @TODO implement logic for adding a channel
    Pubsub.publish(NOTIF.GROUP_MODAL_TOGGLE, null);
    Pubsub.publish(NOTIF.TOGGLE_SIDEBAR_MOBILE, null);
  }

  const addDirectMessage = () => {
    // @TODO implement DM modal
    Pubsub.publish(NOTIF.DIRECT_MESSAGE_MODAL_TOGGLE, null);
    Pubsub.publish(NOTIF.TOGGLE_SIDEBAR_MOBILE, null);
  }

  // @TODO will likely need to add logic to distinguish between channels group and direct group
  return (
    <div className={groupMenuClass}>
      <div className='channels-container mt-1 mb-4'>
        <div className='list-group-header d-flex justify-content-between'>
          <h5 className='pl-2 text-light'>Channels</h5>
          <button type='button' className='add-btn' onClick={addChannel}></button>
        </div>
        
        <ChannelList selectedGroupId={props.selectedGroupId} />
      </div>
      
      <div className='direct-container mt-1 mb-4'>
        <div className='list-group-header d-flex justify-content-between'>
          <h5 className='pl-2 text-light'>Direct Messages</h5>
          <button type='button' className='add-btn' onClick={addDirectMessage}></button>
        </div>
        <DirectList selectedGroupId={props.selectedGroupId} />
      </div>

      <NewGroupModal />
    </div>
  );
}

export default GroupsView;