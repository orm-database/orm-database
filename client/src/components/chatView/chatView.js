import React, { useState, useEffect } from 'react';
import './chatView.css';

function ChatView(props) {
  /* props = {
    selectedGroupId: Number - group_id of the chat group
  } */

  const [messageList, setMessageList] = useState(null);

  useEffect(() => {
    // @TODO fetch all messages in the group given by props.selectedGroupId
  }, []);

  const generateMessages = () => {
    
  }


  return (
    <ul class='list-group list-group-flush scrollable'>
      <li class='list-group-item'>Cras justo odio</li>
      <li class='list-group-item'>Dapibus ac facilisis in</li>
      <li class='list-group-item'>Morbi leo risus</li>
      <li class='list-group-item'>Porta ac consectetur ac</li>
      <li class='list-group-item'>Vestibulum at eros</li>
      <li class='list-group-item'>Cras justo odio</li>
      <li class='list-group-item'>Dapibus ac facilisis in</li>
      <li class='list-group-item'>Morbi leo risus</li>
      <li class='list-group-item'>Porta ac consectetur ac</li>
      <li class='list-group-item'>Vestibulum at eros</li>
      <li class='list-group-item'>Cras justo odio</li>
      <li class='list-group-item'>Dapibus ac facilisis in</li>
      <li class='list-group-item'>Morbi leo risus</li>
      <li class='list-group-item'>Porta ac consectetur ac</li>
      <li class='list-group-item'>Vestibulum at eros</li>
    </ul>
  );
}

export default ChatView;