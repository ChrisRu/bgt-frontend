import React from 'react';
import { FilterIcon } from '../../util/icons';

const Filter = ({ onOpen, closed }) => (
  <div className="filter">
    <FilterIcon onClick={() => onOpen(!closed)} />
    {!closed && (
      <div className="filter--popup">
        <h3>Filter on categories:</h3>
        <p>Test</p>
      </div>
    )}
  </div>
);

export default Filter;
