import React from 'react';
import classnames from 'classnames';

import { CheckIcon, CrossIcon, EditIcon } from '../../../../util/static/icons';

const OpenCategory = ({ form, data, name, done, onEdit, onClose }) => {
  return (
    <div>
      <span className="category__name">{name}</span>
      <div className={classnames('category__icon', { hidden: !done })}>
        <CheckIcon />
      </div>
      <button
        className="button button--cancel button--icon-only pull-right"
        type="submit"
        onClick={onClose}
      >
        <CrossIcon />
      </button>
      <button
        className="button button--cancel button--icon-only pull-right"
        type="submit"
        onClick={onEdit}
      >
        <EditIcon />
      </button>
      <div className="category__content">
        {form.map(item => (
          <div key={item.apiName} className="category__item">
            <div className="label">{item.name}</div>
            <span className="divide">:</span>
            <div className="value">{data[item.apiName] || ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenCategory;
