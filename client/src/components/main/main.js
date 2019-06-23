import React, { useState, useEffect } from 'react';
import './main.css';

import GroupsView from '../groupsView/groupsView';
import ChatContent from '../chatContent/chatContent';

function Main() {

  const [selectedGroupId, setSelectedGroupId] = useState(null);

  // @TODO use pubsub to subscribe to group changes and pass down as appropriate

  const handleGroupChange = (newGroup) => {
    setSelectedGroupId(newGroup);
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <GroupsView selectedGroupId={selectedGroupId} />
        <ChatContent selectedGroupId={selectedGroupId} />
      </div>
    </div>
  );
}

export default Main;