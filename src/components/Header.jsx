import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/bgt.png';
import MenuButton from './MenuButton';
import Search from './Search';
import { FilterIcon } from '../util/icons';

const Header = ({ toggleSidebar, onSearch }) => (
  <div className="header">
    <div className="header--logo">
      <img src={logo} alt="Logo Den Haag - Vrede en Recht" />
      <span>BGT</span>
    </div>
    <div className="header--navigation">
      <Filter />
      <Search onChange={onSearch} />
      <MenuButton onChange={toggleSidebar} />
    </div>
  </div>
);

const Filter = () => (
  <div className="filter">
    <FilterIcon />
    <span>Filter</span>
  </div>
);

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default Header;
