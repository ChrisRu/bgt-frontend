import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ visible, points }) => (
  <div className={`sidebar ${visible ? '' : 'hidden'}`}>
    {points.map(position => (
      <div key={position[0]} className="sidebar--item">
        {position}
      </div>
      ))}
  </div>
);

Sidebar.propTypes = {
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number, PropTypes.number)).isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Sidebar;
