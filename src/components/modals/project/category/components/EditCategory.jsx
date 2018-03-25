import React from 'react';

import Form from '../../../../forms/Form';

import { CrossIcon } from '../../../../util/static/icons';

const EditCategory = ({ name, form, onSubmit, onClose }) => {
  return (
    <div>
      <span className="category__name">{name}</span>
      <button
        className="button button--cancel button--icon-only pull-right"
        type="submit"
        onClick={onClose}
      >
        <CrossIcon />
      </button>
      <Form form={form} />
      <button
        className="button button--confirm"
        type="submit"
        onClick={onSubmit}
      >
        Opslaan
      </button>
    </div>
  );
};

export default EditCategory;
