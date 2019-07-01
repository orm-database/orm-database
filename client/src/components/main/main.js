import React, { useState, useEffect } from 'react';
import './main.css';

import GroupsView from '../groupsView/groupsView';
import ChatContent from '../chatContent/chatContent';
import Pubsub from '../../utilities/pubsub';
import { NOTIF } from '../../utilities/constants';

function Main() {

  const [selectedGroupId, setSelectedGroupId] = useState('');

  // @TODO use pubsub to subscribe to group changes and pass down as appropriate
  useEffect(() => {
    Pubsub.subscribe(NOTIF.GROUP_SELECTED, this, handleGroupChange);

    return(() => {
      Pubsub.unsubscribe(NOTIF.GROUP_SELECTED, this);
    })
  }, []);

  const handleGroupChange = (newGroup) => {
    console.log(newGroup);
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