import React, { useState, useEffect } from 'react';
import './chatListGroup.css';

import ChatListItem from '../chatListItem/chatListItem';

import { CHAT_GROUP_TYPES, NOTIF } from '../../utilities/constants';
import Pubsub from '../../utilities/pubsub';
import Data from '../../utilities/data';

function ChatListGroup(props) {
  /* props = {
    groupType: String - one of CHAT_GROUP_TYPES
    selectedGroupId: Number - group_id of the chat group
  } */
  
  const [groupsFetched, setGroupsFetched] = useState(false);
  const [groups, setGroups] = useState([]);
  const [directs, setDirects] = useState([]);

  useEffect(() => {
    Data.getAllChannels();
  }, []);
  
  useEffect(() => {
    Pubsub.subscribe(NOTIF.GROUPS_DOWNLOADED, this, handleNewGroups);

    return (() => {
      Pubsub.unsubscribe(NOTIF.GROUPS_DOWNLOADED, this);
    });
  }, []);
  
  useEffect(() => {
    // @TODO grab groups from global state based on props.groupType

    if (props.groupType === CHAT_GROUP_TYPES.group) {
      setGroups(groups);
      setGroupsFetched(true);
    } else {
      setGroups(directs);
      setGroupsFetched(true);
    }
  });

  const handleNewGroups = (data) => {
    setGroups(data);
    setGroupsFetched(true);
  }

  const generateChatListItems = () => {
    // display a loading notification while the code is fetching the groups
    if (!groupsFetched) {
      return (
        <ChatListItem type={CHAT_GROUP_TYPES.loading} />
      )
    } else {
      let groupTypeVals = Object.values(CHAT_GROUP_TYPES);

      // check if groups contains any info - return null if not
      if (groups) {
        const items = groups.map(item => {
          let groupType = groupTypeVals.indexOf(item.type);
  
          if (groupType >= 0) {
            let active = props.selectedGroupId === item.group_id;

            return (
              <ChatListItem 
                type={groupTypeVals[groupType]} 
                name={item.name} 
                unreadCount={item.unread_count} 
                active={active} 
                key={item.group_id} 
              />
            )
          } else {
            return null;
          }
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

export default ChatListGroup;