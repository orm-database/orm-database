import React, { useState, useEffect } from 'react';
import './navbarAuthDropdown.css';

import Pubsub from '../../utilities/pubsub';
import { NOTIF, AUTH_MODAL_TYPES } from '../../utilities/constants';
import Auth from '../../utilities/auth';

function NavbarAuthDropdown(props) {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    Auth.checkForExistingSession();
  }, []);


  useEffect(() => {
    Pubsub.subscribe(NOTIF.SIGN_IN, this, handleSignin);
    Pubsub.subscribe(NOTIF.SIGN_OUT, this, handleSignout);

    return (() => {
      Pubsub.unsubscribe(NOTIF.SIGN_IN, this);
      Pubsub.unsubscribe(NOTIF.SIGN_OUT, this);
    });
  }, []);

  // Do not need to verify authentication because the auth object will verify before sending a notification through pubsub
  const handleSignin = () => {
    setAuthenticated(true);
  }

  const handleSignout = () => {
    setAuthenticated(false);
  }

  const toggleModal = (modalType) => {
    console.log('toggle modal fired');
    Pubsub.publish(NOTIF.MODAL_TOGGLE, modalType);
  }

  const generateDropdownMenuContent = () => {
    let menuContent;

    if (authenticated) {
      menuContent = generateAuthenticatedMenu();
    } else {
      menuContent = generateGenericMenu();
    }

    return (
      <div className='dropdown-menu dropdown-menu-right' aria-labelledby='navbarDropdown'>
        {menuContent}
      </div>
    );
  }

  const generateAuthenticatedMenu = () => {
    // @TODO finish this function
    return (
      <div className='d-flex justify-content-center'>
        <button type='button' className='btn btn-danger' onClick={() => Auth.sendSignoutRequest()}>Sign Out</button>
      </div>
    );
  }

  const generateGenericMenu = () => {
    // @TODO add onClicks to the buttons
    return (
      <div className='d-flex justify-content-center flex-column'>
        <button type='button' className='btn btn-primary mx-2' onClick={() => toggleModal(AUTH_MODAL_TYPES.signin)}>Sign In</button>
        {/* <div className="dropdown-divider"></div> */}
        <button type='button' className='btn btn-link' onClick={() => toggleModal(AUTH_MODAL_TYPES.signup)}>Create an Account</button>
      </div>
    );
  }

  return (
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        My Account
      </a>
      {generateDropdownMenuContent()}
    </li>
  )
}

export default NavbarAuthDropdown;