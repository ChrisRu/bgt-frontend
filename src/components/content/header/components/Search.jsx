import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import HTTP from '../../../util/services/http';
import { SearchIcon, LoadingIcon } from '../../../util/static/icons';

class Search extends Component {
  state = {
    fetching: false,
    results: []
  };

  onChange = async event => {
    this.open();

    const { value } = event.target;

    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.setState({ fetching: true });
    this.setState({
      results: await HTTP.geo.code('Den Haag ' + value),
      fetching: false
    });
  };

  onKeyDown = event => {
    const { results } = this.state;
    if (event.keyCode === 13 && results.length > 0) {
      this.props.onDropdown(results[0].key);
    }
  };

  open = force => {
    this.props.onOpen(!this.input.value);

    if (force) {
      this.props.onOpen(false);
      this.focus();
    }
  };

  focus = event => {
    if (!event || event.target.nodeName !== 'input') {
      this.input.focus();
    }
  };

  blur = () => {
    if (this.input.value === '') {
      this.props.onOpen(true);
    }
  };

  render() {
    const { results, fetching } = this.state;
    const { closed, onDropdown } = this.props;

    return (
      <div
        className={classnames('search', {
          'search--is-closed': closed,
          'search--has-results': results.length > 0
        })}
      >
        <input
          className="search__input"
          title="Zoek op de kaart"
          placeholder="Zoek op de kaart..."
          onChange={this.onChange}
          ref={input => {
            this.input = input;
          }}
          onFocus={this.focus}
          onBlur={this.blur}
        />
        {!fetching ? (
          <SearchIcon
            title="Zoek op de kaart"
            onClick={() => this.open(true)}
          />
        ) : (
          <LoadingIcon />
        )}
        {!closed && results.length > 0 ? (
          <div className="search__dropdown">
            {results.map(result => (
              <div
                key={result.key}
                className="search__dropdown-item"
                onClick={() => {
                  onDropdown(result.key);
                }}
              >
                {result.value}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

Search.propTypes = {
  onDropdown: PropTypes.func,
  closed: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired
};

export default Search;
