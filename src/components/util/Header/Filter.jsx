import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { FilterIcon } from '../../../util/icons';

const duration = 300;

const defaultStyle = {
  willChange: 'opacity, transform',
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

const Filter = ({ onOpen, onChange, closed }) => (
  <div className="filter">
    <FilterIcon onClick={() => onOpen(!closed)} />
    <Transition in={!closed} timeout={0}>
      {state => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
          className="filter--popup"
        >
          <h3>Filter on categories:</h3>
          <p>W.I.P.</p>
        </div>
      )}
    </Transition>
  </div>
);

Filter.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  closed: PropTypes.bool.isRequired
};

export default Filter;
