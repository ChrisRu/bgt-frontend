import React from 'react';

const EditCategory = ({ name, onSubmit }) => {
  return (
    <React.Fragment>
      <span className="category__name">{name}</span>
      <input type="text" className="input" />
      <input type="text" className="input" />
      <button
        className="button button--confirm"
        type="submit"
        onClick={onSubmit}
      >
        Opslaan
      </button>
    </React.Fragment>
  );
};

export default EditCategory;
