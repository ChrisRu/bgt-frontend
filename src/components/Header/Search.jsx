import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '../../util/icons';

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

  focus = () => {
    this.input.focus();
  }

  blur = () => {
    this.setState({ open: false, focus: false });

    if (this.input.value === '') {
      this.props.onOpen(true);
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.focus);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.focus);
  }

  render() {
    const { results, open } = this.state;
    const { closed, onSubmit } = this.props;

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
  onChange: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired
};

export default Search;