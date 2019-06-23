import React from 'react';
import './navbarBrand.css';

import { APP_NAME } from '../../utilities/constants';

function NavbarBrand() {
  return (
    <a class="navbar-brand" href="#">{APP_NAME}</a>
  );
}

export default NavbarBrand;