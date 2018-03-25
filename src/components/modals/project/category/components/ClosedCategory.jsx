import React from 'react';
import classnames from 'classnames';

import { CheckIcon } from '../../../../util/static/icons';

const ClosedCategory = ({ name, done, onOpen }) => {
  return (
    <div onClick={onOpen}>
      <span className="category__name">{name}</span>
      <div className={classnames('category__icon', { hidden: !done })}>
        <CheckIcon />
      </div>
    </div>
  );
};

export default ClosedCategory;
