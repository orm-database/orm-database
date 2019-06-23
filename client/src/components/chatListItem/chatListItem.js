import React, { useState, useEffect } from 'react';
import './chatListItem.css';

import { CHAT_GROUP_TYPES } from '../../utilities/constants';

function ChatListItem(props) {
  /* props = {
    type: String - one of CHAT_GROUP_TYPES
    active: <Optional>Bool - whether or not this item is the active one
    key: <Optional>Number - matches the group_id column in the database
  } */
  
  const [itemText, setItemText] = useState(null);
  const [itemUnreadCount, setItemUnreadCount] = useState(0);
  const [itemClassName, setItemClassName] = useState('list-group-item list-group-item-action py-1 d-flex justify-content-between align-items-center');

  useEffect(() => {
    if (props.active) {
      setItemClassName('list-group-item list-group-item-action active py-1 d-flex justify-content-between align-items-center');
    }
    // @TODO grab the group's name and unreadCount from global state by using the group id (key) given in props
    setItemText('TEST');
    setItemUnreadCount(4);
  }, []);

  const generateUnreadCountBadge = () => {
    if (itemUnreadCount > 0) {
      return (
        <span className='badge badge-primary badge-pill'>{itemUnreadCount}</span>
      );
    } else {
      return null;
    }
  }

  return (
    <button type='button' className={itemClassName}>
      {itemText}
      {generateUnreadCountBadge()}
    </button>
  );
}

export default ChatListItem;