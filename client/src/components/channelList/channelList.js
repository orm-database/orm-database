import React, { useState, useEffect } from 'react';
import './channelList.css';

import ChatListItem from '../chatListItem/chatListItem';

import { CHAT_GROUP_TYPES, NOTIF } from '../../utilities/constants';
import Pubsub from '../../utilities/pubsub';
import Data from '../../utilities/data';

function ChannelList(props) {
  /* props = {
    selectedGroupId: String - id of the active message thread, i.e. channel_4 or direct_2
  } */
  
  const [groupListFetched, setGroupListFetched] = useState(false);
  const [groupList, setGroupList] = useState([]);
  
  useEffect(() => {
    Pubsub.subscribe(NOTIF.GROUPS_DOWNLOADED, this, handleNewGroups);
    Pubsub.subscribe(NOTIF.CHANNEL_JOIN, this, handleNewChannelJoin);
    Pubsub.subscribe(NOTIF.SIGN_IN, this, handleSignin);
    Pubsub.subscribe(NOTIF.SIGN_OUT, this, handleSignout);

    return (() => {
      Pubsub.unsubscribe(NOTIF.GROUPS_DOWNLOADED, this);
      Pubsub.unsubscribe(NOTIF.CHANNEL_JOIN, this);
      Pubsub.unsubscribe(NOTIF.SIGN_IN, this);
      Pubsub.unsubscribe(NOTIF.SIGN_OUT, this);
    });
  }, []);

  const handleNewGroups = (data) => {
    console.log(data);
    setGroupList(data);
    setGroupListFetched(true);
  }

  const handleNewChannelJoin = () => {
    Data.getAllChannels();
  }

  const handleSignin = () => {
    Data.getAllChannels();
  }

  const handleSignout = () => {
    setGroupList([]);
    setGroupListFetched(false);
  }

  const generateChatListItems = () => {
    // display a loading notification while the code is fetching the groups
    if (!groupListFetched) {
      return null;
    } else {
      if (groupList.length) {
        let activeId = props.selectedGroupId.replace( /^\D+/g, '');

        const items = groupList.map(item => {
          let active = props.selectedGroupId.indexOf('channel') >= 0 && activeId == item.channel_id;
          console.log(active);

          return (
            <ChatListItem 
              type={CHAT_GROUP_TYPES.channel} 
              name={item.channel_name} 
              unreadCount={item.unread_count || 0} 
              active={active} 
              group_id={item.channel_id}
              key={item.channel_id} 
            />
          );
        });
  
        return (items);
      } else {
        // display an item indicating that the user is not part of any groups/conversations
        return null;
      }
    }
  }
  
  return (
    <div className="list-group-flush p-0">
      {generateChatListItems()}
    </div>
  );
}

export default ChannelList;