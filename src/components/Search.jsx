import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

const SearchIcon = () => (
  <svg
    className="search--icon"
    width="66"
    height="67"
    viewBox="0 0 66 67"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>Search</title>
    <g transform="translate(236 57)">
      <mask id="b">
        <use
          xlinkHref="#a"
          fill="#fff"
          transform="rotate(45 -80.198 -226.682)"
        />
      </mask>
      <g mask="url(#b)">
        <use xlinkHref="#c" transform="rotate(45 -80.198 -226.682)" />
      </g>
    </g>
    <g transform="translate(236 57)">
      <mask id="e">
        <use xlinkHref="#d" fill="#fff" transform="translate(-236 -56.25)" />
      </mask>
      <g mask="url(#e)">
        <use xlinkHref="#f" transform="translate(-236 -56.25)" />
      </g>
    </g>
    <defs>
      <path
        id="a"
        d="M0 2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"
      />
      <path
        id="c"
        d="M2 8h16V-8H2V8zm10-6v4h16V2H12zm6-2H2v16h16V0zM8 6V2H-8v4H8zM2-8C-3.523-8-8-3.523-8 2H8a6 6 0 0 1-6 6V-8zM18 8a6 6 0 0 1-6-6h16c0-5.523-4.477-10-10-10V8zm-6-2a6 6 0 0 1 6-6v16c5.523 0 10-4.477 10-10H12zM2 0a6 6 0 0 1 6 6H-8c0 5.523 4.477 10 10 10V0z"
      />
      <path
        id="d"
        d="M60 30c0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0c16.569 0 30 13.431 30 30z"
      />
      <path
        id="f"
        d="M52 30c0 12.15-9.85 22-22 22v16c20.987 0 38-17.013 38-38H52zM30 52C17.85 52 8 42.15 8 30H-8c0 20.987 17.013 38 38 38V52zM8 30C8 17.85 17.85 8 30 8V-8C9.013-8-8 9.013-8 30H8zM30 8c12.15 0 22 9.85 22 22h16C68 9.013 50.987-8 30-8V8z"
      />
    </defs>
  </svg>
);

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

    return fetch(`${url}${location}&${options}`)
      .then(res => res.json())
      .then(results => this.setState({ results, open: this.state.focus }))
      .catch(console.error);
  };

  render() {
    const { results } = this.state;
    const { onSubmit } = this.props;

    return (
      <div className="search">
        <input
          className="search--input"
          title="Zoek een straat"
          placeholder="Zoek een straat..."
          onChange={this.onChange}
          ref={input => {
            this.input = input;
          }}
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ open: false, focus: false })}
        />
        <SearchIcon />
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
