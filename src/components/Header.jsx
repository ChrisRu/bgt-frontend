import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/bgt.png';
import MenuButton from './MenuButton';
import Search from './Search';

const Header = ({ toggleSidebar, onSearch }) => (
  <div className="header">
    <div className="header--logo">
      <img src={logo} alt="Logo Den Haag - Vrede en Recht" />
      <span>BGT</span>
    </div>
    <div className="header--navigation">
      <Search onChange={onSearch} />
      <MenuButton onChange={toggleSidebar} />
    </div>
  </div>
);

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default Header;
