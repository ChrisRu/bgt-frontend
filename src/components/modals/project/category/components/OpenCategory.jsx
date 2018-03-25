import React from 'react';
import classnames from 'classnames';

import { CheckIcon, EditIcon } from '../../../../util/static/icons';

const OpenCategory = ({ form, data, name, done, onEdit }) => {
  return (
    <div>
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
      <div className="category__content">
        {Object.keys(data).map(() => {
          return 'ay';
        })}
      </div>
    </div>
  );
};

export default OpenCategory;
