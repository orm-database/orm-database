import React, { useState, useEffect } from 'react';
import './chatListItem.css';

import { CHAT_GROUP_TYPES, NOTIF } from '../../utilities/constants';
import Pubsub from '../../utilities/pubsub';

function ChatListItem(props) {
  /* props = {
    type: String - one of CHAT_GROUP_TYPES
    name: String - name of group
    unreadCount: Number
    active: <Optional>Bool - whether or not this item is the active one
    group_id: Number - matches the group_id column in the database
    key: <Optional>Number - matches the group_id column in the database
  } */

  const [btnClassName, setBtnClassName] = useState('list-group-item list-group-item-action py-1 d-flex justify-content-between align-items-center');
  const [spanClassName, setSpanClassName] = useState('text-light not-selected');

  useEffect(() => {
    if (props.active) {
      setBtnClassName('list-group-item list-group-item-action active py-1 d-flex justify-content-between align-items-center');
      setSpanClassName('text-light selected');
    } else {
      setBtnClassName('list-group-item list-group-item-action py-1 d-flex justify-content-between align-items-center');
      setSpanClassName('text-light not-selected');
    }
  }, [props.active]);

  const generateUnreadCountBadge = () => {
    if (props.unreadCount > 0) {
      return (
        <span className='badge badge-primary badge-pill'>{props.unreadCount}</span>
      );
    } else {
      return null;
    }
  }

  const newGroupSelected = () => {
    let data = props.type + '_' + props.group_id;
    console.log(data);
    Pubsub.publish(NOTIF.GROUP_SELECTED, data);
  }

  return (
    <button type='button' className={btnClassName} onClick={newGroupSelected}>
      <span className={spanClassName}>{props.name}</span>
      {generateUnreadCountBadge()}
    </button>
  );
}

export default ChatListItem;