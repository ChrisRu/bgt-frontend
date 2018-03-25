import React from 'react';
import classnames from 'classnames';

import { CheckIcon, EditIcon } from '../../../../util/static/icons';

const OpenCategory = ({ name, done, onEdit }) => {
  return (
    <React.Fragment>
      <span className="category__name">{name}</span>
      <div className={classnames('category__icon', { hidden: !done })}>
        <CheckIcon />
      </div>
      <button
        className="button button--cancel button--icon-only pull-right"
        type="submit"
        onClick={onEdit}
      >
        <EditIcon />
      </button>
    </React.Fragment>
  );
};

export default OpenCategory;
