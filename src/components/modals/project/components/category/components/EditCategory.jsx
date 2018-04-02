import React from 'react';

import Form from '../../../../../forms/Form';

import { CrossIcon, SaveIcon } from '../../../../../util/static/icons';

const EditCategory = ({ name, form, data, onSubmit, onClose }) => {
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
      <Form form={form} data={data} />
      <div className="category__buttons">
        <button
          className="button button--confirm"
          type="submit"
          onClick={onSubmit}
        >
          <SaveIcon />
          Opslaan
        </button>
      </div>
    </div>
  );
};

export default EditCategory;
