import React, { useState, useEffect } from 'react';
import './chatListGroup.css';

import ChatListItem from '../chatListItem/chatListItem';

import { CHAT_GROUP_TYPES } from '../../utilities/constants';

function ChatListGroup(props) {
  
  const [groupsFetched, setGroupsFetched] = useState(false);
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    // @TODO grab groups from global state
  }, []);

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
            return (
              <ChatListItem type={groupTypeVals[groupType]} key={item.group_id} />
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