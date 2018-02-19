import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '../util/icons';

class Search extends Component {
  state = {
    open: false
  };

  onChange = async event => {
    const { value } = event.target;

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  render() {
    const { results, open } = this.state;
    const { onSubmit } = this.props;

    return (
      <div className="search">
        <input
          className="search--input"
          title="Zoek een locatie of nummer"
          placeholder="Zoeken..."
          onChange={this.onChange}
          ref={input => {
            this.input = input;
          }}
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ open: false, focus: false })}
        />
        <SearchIcon />
        {open && (
          <div className="search--dropdown">
            {results.map(result => (
              <div
                key={result.place_id}
                className="search--dropdown-item"
                onClick={() => {
                  onSubmit(result);
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
  onChange: PropTypes.func.isRequired
};

export default Search;
