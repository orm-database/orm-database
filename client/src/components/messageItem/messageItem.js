import React from 'react';
import './messageItem.css';

function MessageItem(props) {
  /* props = {
    author: String,
    timestamp: unknown format for the moment,
    content: String - message text,
    key: Number - Arbitrary value required by React
  } */

  return (
    <li class='list-group-item'>
      <span className='author'>{props.author}: </span>
      <span className='timestamp float-right ml-1 text-muted'>{props.timestamp}</span>
      <span className='content'>{props.content}</span>
    </li>
  );
}

export default MessageItem;