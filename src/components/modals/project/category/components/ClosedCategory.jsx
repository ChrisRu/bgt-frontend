import React from 'react';
import classnames from 'classnames';

import { CheckIcon } from '../../../../util/static/icons';

const ClosedCategory = ({ name, done }) => {
  return (
    <React.Fragment>
      <span className="category__name">{name}</span>
      <div className={classnames('category__icon', { hidden: !done })}>
        <CheckIcon />
      </div>
    </React.Fragment>
  );
};

export default ClosedCategory;
