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
  const [spanClassName, setSpanClassName] = useState(props.dark ? 'not-selected' : 'text-light not-selected');



  useEffect(() => {
    if (props.active) {
      setBtnClassName('list-group-item list-group-item-action active py-1 d-flex justify-content-between align-items-center');
      if (props.dark) {
        setSpanClassName('selected');
      } else {
        setSpanClassName('text-light selected');
      }
    } else {
      setBtnClassName('list-group-item list-group-item-action py-1 d-flex justify-content-between align-items-center');
      if (props.dark) {
        setSpanClassName('not-selected');
      } else {
        setSpanClassName('text-light not-selected');
      }
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
    if (props.onSelect) {
      props.onSelect(props.group_id);
    } else {
      let data = props.type + '_' + props.group_id;
      console.log(data);
      Pubsub.publish(NOTIF.GROUP_SELECTED, data);
      Pubsub.publish(NOTIF.TOGGLE_SIDEBAR_MOBILE, null);
    }
  }

  return (
    <button type='button' className={btnClassName + ' item'} onClick={newGroupSelected}>
      <span className={spanClassName}>{props.name}</span>
      {generateUnreadCountBadge()}
    </button>
  );
}

export default ChatListItem;