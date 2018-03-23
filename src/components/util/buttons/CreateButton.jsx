import React from 'react';
import PropTypes from 'prop-types';

const CreateButton = ({ onClick }) => (
  <div className="create-button" onClick={onClick}>
    <div className="icon icon--plus">
      <span />
      <span />
    </div>
  </div>
);

CreateButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default CreateButton;
