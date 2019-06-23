import React from 'react';
import './navbar.css';

// Component imports
import NavbarBrand from '../navbarBrand/navbarBrand';
import NavbarAuthDropdown from '../navbarAuthDropdown/navbarAuthDropdown';

function Header() {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavbarBrand />

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <NavbarAuthDropdown />
        </ul>
      </div>
    </nav>
  );
}

export default Header;