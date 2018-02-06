import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

class Search extends Component {
  state = {
    open: false,
    results: [],
    interval: null
  };

  get isOpen() {
    const { results, open } = this.state;
    return open && results && results.length > 0;
  }

  onChange = async event => {
    const { value } = event.target;

    if (this.state.interval === null) {
      await this.search(value);
    } else {
      clearInterval(this.state.interval);
    }

    this.setState({
      interval: setTimeout(() => {
        this.state.interval = null;
        this.search(value);
      }, 300)
    });

    if (this.props.onChange) {
      this.props.onChange(value, this.state.results);
    }
  };

  search = async search => {
    const url = 'https://nominatim.openstreetmap.org/search?q=';
    const options = queryString.stringify({
      format: 'json',
      polygon: 1,
      addressdetails: 1,
      'accept-language': 'nl'
    });
    const location = search.split(' ').join('+');

    const results = await fetch(`${url}${location}&${options}`)
      .then(res => res.json())
      .catch(console.error);

    this.setState({ results, open: true });
  };

  render() {
    const { results } = this.state;
    const { onSubmit } = this.props;

    return (
      <div className="search">
        <input
          className="search--input"
          onChange={this.onChange}
          onBlur={() => this.setState({ open: false })}
        />
        {this.isOpen && (
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
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
};

export default Search;
