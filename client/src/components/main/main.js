import React, { useState, useEffect } from 'react';
import './main.css';

import GroupsView from '../groupsView/groupsView';
import ChatContent from '../chatContent/chatContent';

import { user } from '../../utilities/auth';
import Data from '../../utilities/data';
import Pubsub from '../../utilities/pubsub';
import { NOTIF } from '../../utilities/constants';

function Main() {

  const [authenticated, setAuthenticated] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState('');

  // @TODO use pubsub to subscribe to group changes and pass down as appropriate
  useEffect(() => {
    Pubsub.subscribe(NOTIF.SIGN_IN, this, handleSignin);
    Pubsub.subscribe(NOTIF.SIGN_OUT, this, handleSignout);
    Pubsub.subscribe(NOTIF.GROUP_SELECTED, this, handleGroupChange);

    return(() => {
      Pubsub.unsubscribe(NOTIF.GROUP_SELECTED, this);
      Pubsub.unsubscribe(NOTIF.SIGN_OUT, this);
      Pubsub.unsubscribe(NOTIF.SIGN_IN, this);
    });
  }, []);

  useEffect(() => {
    if (selectedGroupId) {
      Data.changeSocketRoom(selectedGroupId);
    }
  }, [selectedGroupId]);

  const handleSignout = () => {
    setAuthenticated(false);
    setSelectedGroupId('');
  }

  const handleSignin = () => {
    setAuthenticated(true);
    Data.connectSocket(user.user_id);
  }

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