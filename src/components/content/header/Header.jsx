import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Search from './components/Search';
import Filter from './components/Filter';

import Show from '../../util/Show';

import logo from '../../../assets/logos/bgt.png';

class Header extends Component {
  state = {
    searchClosed: true,
    filterClosed: true
  };

  render() {
    const { searchClosed, filterClosed } = this.state;
    const { onSearch, onFilter, showSearch, onPositionClick } = this.props;

    return (
      <header className="header">
        <div className="header__logo">
          <img src={logo} alt="Logo Den Haag - Vrede en Recht" />
          <span>BGT</span>
        </div>
        <div className="header__icons">
          <Show
            visible={showSearch}
            render={() => (
              <React.Fragment>
                <Search
                  closed={searchClosed}
                  onOpen={state => this.setState({ searchClosed: state })}
                  onChange={onSearch}
                  onDropdown={(...args) => {
                    onPositionClick(...args);
                    this.setState({ searchClosed: true });
                  }}
                />
                <Filter
                  closed={filterClosed}
                  onOpen={state => this.setState({ filterClosed: state })}
                  onChange={onFilter}
                />
              </React.Fragment>
            )}
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
