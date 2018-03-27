import React from 'react';
import classnames from 'classnames';

import Table from '../../../../forms/components/Table';
import { CheckIcon, CrossIcon, EditIcon } from '../../../../util/static/icons';

const OpenCategory = ({ form, data, name, done, onEdit, onClose }) => {
  return (
    <div onClick={onClose}>
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
      <Table className="margin-top-5" form={form} data={data} />
    </div>
  );
};

export default OpenCategory;
