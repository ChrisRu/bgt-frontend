import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/bgt.png';
import MenuButton from './MenuButton';
import Search from './Search';
import Filter from './Filter';

class Header extends Component {
  state = {
    searchClosed: true,
    filterClosed: true
  };

  render() {
    const { searchClosed, filterClosed } = this.state;
    const { toggleSidebar, onSearch, onFilter } = this.props;

    return (
      <header className="header">
        <div className="header--logo">
          <img src={logo} alt="Logo Den Haag - Vrede en Recht" />
          <span>BGT</span>
        </div>
        <nav className="header--navigation">
          <NavLink to="/kaart">Kaart</NavLink>
          <NavLink to="/lijst">Lijst</NavLink>
        </nav>
        <div className="header--icons">
          <Search
            closed={searchClosed}
            onOpen={state => this.setState({ searchClosed: state })}
            onChange={onSearch}
          />
          <Filter
            closed={filterClosed}
            onOpen={state => this.setState({ filterClosed: state })}
            onChange={onFilter}
          />
          <MenuButton onChange={toggleSidebar} />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default Header;
