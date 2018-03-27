import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { SearchIcon } from '../../../util/static/icons';

class Search extends Component {
  state = {
    open: false
  };

  onChange = async event => {
    this.open();

    const { value } = event.target;

    if (this.props.onChange) {
      this.props.onChange(value);
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
    this.setState({ open: false, focus: false });

    if (this.input.value === '') {
      this.props.onOpen(true);
    }
  };

  render() {
    const { results, open } = this.state;
    const { closed, onDropdown } = this.props;

    return (
      <div className={classnames('search', { closed })}>
        <input
          className="search__input"
          title="Zoek een locatie of nummer"
          placeholder="Zoeken..."
          onChange={this.onChange}
          ref={input => {
            this.input = input;
          }}
          onFocus={() => this.setState({ focus: true })}
          onBlur={this.blur}
        />
        <SearchIcon onClick={() => this.open(true)} />
        {onDropdown &&
          open && (
            <div className="search__dropdown">
              {results.map(result => (
                <div
                  key={result}
                  className="search__dropdown-item"
                  onClick={() => {
                    onDropdown(result);
                    this.setState({ open: false });
                  }}>
                  {result.display_name}
                </div>
              ))}
            </div>
          )}
      </div>
    );
  }
}

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  onDropdown: PropTypes.func,
  closed: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired
};

export default Search;
