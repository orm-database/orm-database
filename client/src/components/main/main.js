import React, { useState, useEffect } from 'react';
import './main.css';

import GroupsView from '../groupsView/groupsView';

function Main() {

  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <GroupsView group={selectedGroup} />

        {/* ChatContent - rest of the viewport */}
      </div>
    </div>
  );
}

export default Main;