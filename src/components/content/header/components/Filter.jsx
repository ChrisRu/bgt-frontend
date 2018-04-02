import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import classnames from 'classnames';

import { FilterIcon, SearchIcon } from '../../../util/static/icons';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
  opacity: 0,
  pointerEvents: 'none',
  transform: 'translateY(-100%)'
};

const transitionStyles = {
  entering: {
    opacity: 0,
    pointerEvents: 'all',
    transform: 'translateY(-100%)'
  },
  entered: {
    opacity: 1,
    pointerEvents: 'all',
    transform: 'translateY(0)'
  }
};

class Filter extends Component {
  state = {
    filters: [],
    searchValue: '',
    searchKeys: ['bgtOnNumber', 'status', 'category', 'description'],
    presets: [
      {
        keyName: 'Categorie',
        key: 'category',
        value: 'Nieuwbouw'
      },
      {
        keyName: 'Categorie',
        key: 'category',
        value: 'Wijkmap'
      },
      {
        keyName: 'Status',
        key: 'status',
        value: 'Verwerkt'
      },
      {
        keyName: 'Status',
        key: 'status',
        value: 'Verwerkt',
        invert: true
      }
    ]
  };

  addFilter = filter => {
    let { filters } = this.state;

    let existIndex = filters.indexOf(filter);
    if (existIndex === -1) {
      filters.push(filter);
    } else {
      filters.splice(existIndex, 1);
    }

    this.setState({ filters: filters });

    this.pushFilters();
  };

  pushFilters = () => {
    const { onChange } = this.props;
    const { filters, searchKeys } = this.state;

    onChange(
      project =>
        filters.every(
          ({ key, value, invert }) =>
            invert ? project[key] === value : project[key] !== value
        ) &&
        searchKeys.some(
          key =>
            project[key]
              ? String(project[key]).includes(this.input.value)
              : false
        )
    );
  };

  render() {
    const { onOpen, closed } = this.props;
    const { filters, presets } = this.state;

    return (
      <div className="filter">
        <FilterIcon onClick={() => onOpen(!closed)} />
        <Transition in={!closed} timeout={0}>
          {state => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
              className="filter__popup"
            >
              <h3>Filter:</h3>
              <div className="search">
                <input
                  className="input"
                  type="text"
                  title="Zoek op project..."
                  placeholder="Zoek op project..."
                  ref={input => {
                    this.input = input;
                  }}
                  onChange={this.pushFilters}
                />
                <SearchIcon title="Zoek op project" />
              </div>
              <div className="filter__list">
                {presets.map(preset => (
                  <button
                    key={preset.key + preset.value + preset.invert}
                    className={classnames('button', 'button__filter', {
                      'button__filter--active': filters.includes(preset)
                    })}
                    onClick={() => this.addFilter(preset)}
                  >
                    <strong>{preset.keyName}</strong>
                    <span className="divide">{preset.invert ? '≠' : '='}</span>
                    <span>{preset.value}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

Filter.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  closed: PropTypes.bool.isRequired
};

export default Filter;
