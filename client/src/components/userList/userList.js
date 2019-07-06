import React, { useState, useEffect } from 'react';
import './userList.css';

import ChatListItem from '../chatListItem/chatListItem';

import { CHAT_GROUP_TYPES, NOTIF } from '../../utilities/constants';
import Pubsub from '../../utilities/pubsub';
import Data from '../../utilities/data';
import Auth, { user } from '../../utilities/auth';

function UserList(props) {
  /* props = {
    selectedGroupId: String - id of the active message thread, i.e. channel_4 or direct_2
  } */
  
  const [userListFetched, setUserListFetched] = useState(false);
  const [userList, setUserList] = useState([]);
  
  useEffect(() => {
    // Pubsub.subscribe(NOTIF.GROUPS_DOWNLOADED, this, handleNewGroups);
    Pubsub.subscribe(NOTIF.CHANNEL_JOIN, this, handleNewChannelJoin);
    Pubsub.subscribe(NOTIF.SIGN_IN, this, handleSignin);
    Pubsub.subscribe(NOTIF.SIGN_OUT, this, handleSignout);

    return (() => {
      // Pubsub.unsubscribe(NOTIF.GROUPS_DOWNLOADED, this);
      Pubsub.unsubscribe(NOTIF.CHANNEL_JOIN, this);
      Pubsub.unsubscribe(NOTIF.SIGN_IN, this);
      Pubsub.unsubscribe(NOTIF.SIGN_OUT, this);
    });
  }, []);

  const handleNewGroups = (data) => {
    console.log(data);
    setGroupList(data);
    setGroupListFetched(true);
  }

  const handleNewChannelJoin = () => {
    // @TODO change this to the getUser API call
    Auth.checkForExistingSession();
  }

  const handleSignin = () => {
    // Data.getAllChannels();
    console.log(user.channels_member_of);
    setGroupList(user.channels_member_of);
    setGroupListFetched(true);
  }

  const handleSignout = () => {
    setGroupList([]);
    setGroupListFetched(false);
  }

  const generateUserListItems = () => {
    // display a loading notification while the code is fetching the groups
    if (!userListFetched) {
      return null;
    } else {
      if (userList.length && userList[0].user_id === null) {
        return null;
      } else if (userList.length) {
        let activeId = props.selectedUserId.replace( /^\D+/g, '');

        const items = userList.map(item => {
          let active = props.selectedUserId.indexOf('user') >= 0 && activeId == item.user_id;
          console.log(active);

          return (
            <UserListItem 
              user_id={user.user_id}
              user_first_name={user.first_name}
              user_last_name={user.last_name}
              // type={CHAT_GROUP_TYPES.channel} 
              // name={item.channel_name} 
              // unreadCount={item.unread_count || 0} 
              // active={active} 
              // group_id={item.channel_id}
              // key={item.channel_id} 
            />
          );
        });
  
        return (items);
      } else {
        // display an item indicating that the user is not part of any groups/conversations
        return null;
      }
    }
  }
  
  return (
    <div className="list-group-flush p-0">
      {generateUserListItems()}
    </div>
  );
}

export default UserList;