import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Search from './components/Search';
import Filter from './components/Filter';

import Show from '../../util/Show';

import logo from '../../../assets/logos/bgt.png';

class Header extends Component {
  state = {
    searchClosed: true,
    filterClosed: true
  };

  get routeName() {
    const { pathname } = this.props.location;

    if (pathname.includes('/login')) {
      return 'Log In';
    }

    if (pathname.includes('/kaart')) {
      return 'Project Kaart';
    }

    if (pathname.includes('/lijst')) {
      return 'Project Lijst';
    }

    if (pathname.includes('/terugmeldingen')) {
      return 'Terug Meldingen';
    }

    if (pathname.includes('/dashboard')) {
      return 'Dashboard';
    }

    if (pathname.includes('/gebruikers')) {
      return 'Gebruikers';
    }
  }

  render() {
    const { searchClosed, filterClosed } = this.state;
    const { onSearch, onFilter, showSearch, onPositionClick } = this.props;

    return (
      <header className="header">
        <div className="header__logo">
          <img src={logo} alt="Logo Den Haag - Vrede en Recht" />
          <span>BGT</span>
          <span className="header__current-route">{this.routeName}</span>
        </div>
        <div className="header__icons">
          <Show
            visible={showSearch}
            render={() => (
              <React.Fragment>
                <Search
                  closed={searchClosed}
                  onOpen={state => this.setState({ searchClosed: state })}
                  onChange={(...args) => {
                    if (onSearch) {
                      onSearch(...args);
                    }

                    onPositionClick(null);
                  }}
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
  onFilter: PropTypes.func.isRequired
};

export default withRouter(Header);
