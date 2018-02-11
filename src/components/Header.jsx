import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/bgt.png';
import MenuButton from './MenuButton';
import Search from './Search';

const Header = ({ toggleSidebar, onSubmit, onResults }) => (
  <div className="header">
    <div className="header--logo">
      <img src={logo} alt="Logo Den Haag - Vrede en Recht" />
      <span>BGT</span>
    </div>
    <div className="header--navigation">
      <Search onSubmit={onSubmit} onChange={onResults} />
      <MenuButton onChange={toggleSidebar} />
    </div>
  </div>
);

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  onResults: PropTypes.func
};

export default Header;
