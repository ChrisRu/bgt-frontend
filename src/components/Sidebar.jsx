import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ visible, data }) => (
  <div className={`sidebar ${visible ? '' : 'hidden'}`}>
    <div className="sidebar--item">
      Haagse Hogeschool Something Something
    </div>
  </div>
);

Sidebar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number, PropTypes.number)).isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Sidebar;
