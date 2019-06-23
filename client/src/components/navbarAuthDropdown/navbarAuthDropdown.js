import React, { useState, useEffect } from 'react';
import './navbarAuthDropdown.css';

function NavbarAuthDropdown(props) {

  const [authenticated, setAuthenticated] = useState(false);

  // @TODO check local storage for session token and try to sign in if it exists
  // useEffect(() => {
    
  // }, []);

  const generateDropdownMenuContent = () => {
    let menuContent;

    if (authenticated) {
      menuContent = generateAuthenticatedMenu();
    } else {
      menuContent = generateGenericMenu();
      console.log(typeof menuContent);
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
      <p>Signed In</p>
    );
  }

  const generateGenericMenu = () => {
    // @TODO add onClicks to the buttons
    return (
      <div className='d-flex justify-content-center flex-column'>
        <button type='button' className='btn btn-primary mx-2'>Sign In</button>
        {/* <div className="dropdown-divider"></div> */}
        <button type='button' className='btn btn-link'>Create an Account</button>
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