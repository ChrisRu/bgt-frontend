import React from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-addons-css-transition-group';
import { FilterIcon } from '../../../util/icons';

const Filter = ({ onOpen, onChange, closed }) => (
  <div className="filter">
    <FilterIcon onClick={() => onOpen(!closed)} />
    <TransitionGroup
      transitionName="filter"
      transitionAppear
      transitionEnter
      transitionLeave
      transitionAppearTimeout={300}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}>
      {!closed && (
        <div className="filter--popup">
          <h3>Filter on categories:</h3>
          <p>Test</p>
        </div>
      )}
    </TransitionGroup>
  </div>
);

Filter.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  closed: PropTypes.bool.isRequired
};

export default Filter;