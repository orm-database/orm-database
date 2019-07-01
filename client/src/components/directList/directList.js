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
    Pubsub.subscribe(NOTIF.DMS_DOWNLOADED, this, handleNewDMS);
    Pubsub.subscribe(NOTIF.SIGN_IN, this, handleSignin);
    Pubsub.subscribe(NOTIF.SIGN_OUT, this, handleSignout);

    return (() => {
      Pubsub.unsubscribe(NOTIF.DMS_DOWNLOADED, this);
      Pubsub.unsubscribe(NOTIF.SIGN_IN, this);
      Pubsub.unsubscribe(NOTIF.SIGN_OUT, this);
    });
  }, []);

  const handleNewDMS = (data) => {
    console.log(data);
    setDirectList(data);
    setDirectListFetched(true);
  }

  const handleSignin = () => {
    // @TODO call the fetch directs function when we figure out the endpoint
  }

  const handleSignout = () => {
    setDirectList([]);
    setDirectListFetched(false);
  }

  const generateDirectListItems = () => {
    if (!directListFetched) {
      return null;
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
              group_id={item.direct_group_id}
              key={item.direct_group_id}
            />
          );
        });

        return (items);
      } else {
        return null
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