import React from 'react';
import './navbarBrand.css';

import { APP_NAME, NOTIF } from '../../utilities/constants';
import Pubsub from '../../utilities/pubsub';

function NavbarBrand() {
  const brandClicked = () => {
    if (window.innerWidth <= 575) {
      console.log('Mobile');
      Pubsub.publish(NOTIF.TOGGLE_SIDEBAR_MOBILE, null);
    }
  }

  return (
    <button className='navbar-brand' onClick={brandClicked}>{APP_NAME}</button>
  );
}

export default NavbarBrand;