import React, { useState, useEffect } from 'react';
import './main.css';

import GroupsView from '../groupsView/groupsView';
import ChatContent from '../chatContent/chatContent';

function Main() {

  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupChange = (newGroup) => {
    setSelectedGroup(newGroup);
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <GroupsView group={selectedGroup} onGroupChange={handleGroupChange} />
        <ChatContent group={selectedGroup} />
      </div>
    </div>
  );
}

export default Main;