import React, { useState, useEffect } from 'react';
import './chatListItem.css';

import { CHAT_GROUP_TYPES } from '../../utilities/constants';

function ChatListItem(props) {
  /* props = {
    type: String - one of CHAT_GROUP_TYPES
    name: String - name of group
    unreadCount: Number
    active: <Optional>Bool - whether or not this item is the active one
    key: <Optional>Number - matches the group_id column in the database
  } */

  const [btnClassName, setBtnClassName] = useState('list-group-item list-group-item-action py-1 d-flex justify-content-between align-items-center');
  const [spanClassName, setSpanClassName] = useState('text-light not-selected');

  useEffect(() => {
    if (props.active) {
      setBtnClassName('list-group-item list-group-item-action active py-1 d-flex justify-content-between align-items-center');
      setSpanClassName('text-light selected');
    }
  }, []);

  const generateUnreadCountBadge = () => {
    if (props.unreadCount > 0) {
      return (
        <span className='badge badge-primary badge-pill'>{props.unreadCount}</span>
      );
    } else {
      return null;
    }
  }

  return (
    <button type='button' className={btnClassName}>
      <span className={spanClassName}>{props.name}</span>
      {generateUnreadCountBadge()}
    </button>
  );
}

export default ChatListItem;