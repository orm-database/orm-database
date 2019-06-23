import React from 'react';
import './chatListGroup.css';

function ChatListGroup(props) {
  return (
    <div className="list-group-flush p-0">
      <button type='button' className="list-group-item list-group-item-action py-1 d-flex justify-content-between align-items-center">
        Cras justo odio
        <span className="badge badge-primary badge-pill">14</span>
      </button>
      <button type='buton' className="list-group-item list-group-item-action py-1 d-flex justify-content-between align-items-center">
        Dapibus ac facilisis in
        <span className="badge badge-primary badge-pill">2</span>
      </button>
      <button type='button' className="list-group-item list-group-item-action py-1 d-flex justify-content-between align-items-center">
        Morbi leo risus
        <span className="badge badge-primary badge-pill">1</span>
      </button>
    </div>
  );
}

export default ChatListGroup;