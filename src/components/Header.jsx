import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/DenHaag.svg';

const Header = ({ toggleSidebar }) => (
  <div className="header">
    <div className="header--logo">
      <img src={logo} alt="Logo Den Haag - Vrede en Recht" />
    </div>
    <div className="header--navigation">
      <button className="header--navigation-item" onClick={toggleSidebar}>
        TakenLijst {'<'}
      </button>
    </div>
  </div>
);

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
