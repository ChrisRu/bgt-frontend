import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FilterIcon } from '../../util/icons';

const Filter = ({ onOpen, closed }) => (
  <div className="filter">
    <FilterIcon onClick={() => onOpen(!closed)} />
    <ReactCSSTransitionGroup
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
    </ReactCSSTransitionGroup>
  </div>
);

export default Filter;
