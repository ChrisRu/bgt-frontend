import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      <div className="header">
        <div className="header--logo">
          <img src={logo} alt="Logo Den Haag - Vrede en Recht" />
          <span>BGT</span>
        </div>
        <div className="header--navigation">
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
      </div>
    );
  }
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default Header;
