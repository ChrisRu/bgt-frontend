import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/logos/bgt.png';
import Search from './Search';
import Filter from './Filter';

class Header extends Component {
  state = {
    searchClosed: true,
    filterClosed: true
  };

  render() {
    const { searchClosed, filterClosed } = this.state;
    const { onSearch, onFilter } = this.props;

    return (
      <header className="header">
        <div className="header--logo">
          <img src={logo} alt="Logo Den Haag - Vrede en Recht" />
          <span>BGT</span>
        </div>
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
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired
};

export default Header;
