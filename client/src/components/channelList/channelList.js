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
    Data.getAllChannels();
  }, []);
  
  useEffect(() => {
    Pubsub.subscribe(NOTIF.GROUPS_DOWNLOADED, this, handleNewGroups);

    return (() => {
      Pubsub.unsubscribe(NOTIF.GROUPS_DOWNLOADED, this);
    });
  }, []);

  const handleNewGroups = (data) => {
    console.log(data);
    setGroupList(data);
    setGroupListFetched(true);
  }

  const generateChatListItems = () => {
    // display a loading notification while the code is fetching the groups
    if (!groupListFetched) {
      return (
        <ChatListItem type={CHAT_GROUP_TYPES.loading} />
      )
    } else {
      if (groupList.length) {
        let activeId = props.selectedGroupId.replace( /^\D+/g, '');

        const items = groupList.map(item => {
          let active = props.selectedGroupId.indexOf('channel') >= 0 && activeId == item.channel_id;

          return (
            <ChatListItem 
              type={CHAT_GROUP_TYPES.channel} 
              name={item.channel_name} 
              unreadCount={item.unread_count || 0} 
              active={active} 
              key={item.channel_id} 
            />
          );
        });
  
        return (items);
      } else {
        // display an item indicating that the user is not part of any groups/conversations
        return (
          <ChatListItem type={CHAT_GROUP_TYPES.empty} />
        );
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