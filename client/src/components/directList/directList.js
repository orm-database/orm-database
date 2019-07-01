import React, { useState, useEffect } from 'react';
import './directList.css';

import ChatListItem from '../chatListItem/chatListItem';

import Pubsub from '../../utilities/pubsub';
import { NOTIF, CHAT_GROUP_TYPES } from '../../utilities/constants';

function DirectList(props) {
  /* props = {
    selectedGroupId: String - id of the active message thread, i.e. channel_4 or direct_2
  } */

  const [directListFetched, setDirectListFetched] = useState(false);
  const [directList, setDirectList] = useState([]);

  useEffect(() => {
    // Data.getAllDirectChannels (or whatever the function will be called)
  }, []);

  useEffect(() => {
    Pubsub.subscribe(NOTIF.DMS_DOWNLOADED, this, handleNewDMS);

    return (() => {
      Pubsub.unsubscribe(NOTIF.DMS_DOWNLOADED, this);
    });
  }, []);

  const handleNewDMS = (data) => {
    console.log(data);
    setDirectList(data);
    setDirectListFetched(true);
  }

  const generateDirectListItems = () => {
    if (!directListFetched) {
      return (
        <ChatListItem type={CHAT_GROUP_TYPES.loading} />
      );
    } else {
      if (directList.length) {
        let activeId = props.selectedGroupId.replace( /^\D+/g, '');

        const items = directList.map(item => {
          let active = props.selectedGroupId.indexOf('direct') >= 0 && activeId == item.direct_group_id;

          return (
            <ChatListItem 
              type={CHAT_GROUP_TYPES.direct}
              name={'**persons name**'}
              unreadCount={item.unread_count || 0}
              active={active}
              key={item.direct_group_id}
            />
          );
        });

        return (items);
      } else {
        return (
          <ChatListItem type={CHAT_GROUP_TYPES.empty} />
        );
      }
    }
  }

  return (
    <div className='list-group-flush p-0'>
      {generateDirectListItems()}
    </div>
  );
}

export default DirectList;