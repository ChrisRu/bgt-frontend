import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '../../../util/icons';

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

  open = (force) => {
    this.props.onOpen(!this.input.value);

    if (force) {
      this.props.onOpen(false);
      this.focus();
    }
  }

  focus = event => {
    if (event && event.target.nodeName === 'input') {
      return;
    }

    this.input.focus();
  }

  blur = () => {
    this.setState({ open: false, focus: false });

    if (this.input.value === '') {
      this.props.onOpen(true);
    }
  }

  componentDidMount() {
    window.addEventListener('keypress', this.focus);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.focus);
  }

  render() {
    const { results, open } = this.state;
    const { closed, onDropdown } = this.props;

    return (
      <div className={`search ${closed ? 'closed' : ''}`}>
        <input
          className="search--input"
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
        {onDropdown && open && (
          <div className="search--dropdown">
            {results.map(result => (
              <div
                key={result.place_id}
                className="search--dropdown-item"
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
