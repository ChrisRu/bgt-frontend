import React from 'react';
import PropTypes from 'prop-types';

const SideBarItem = ({ place_id, location, hidden, onClick }) => (
  <div
    className={`sidebar--item ${hidden ? '' : 'gray'}`}
    onMouseOver={() => {
      onClick(place_id, true);
    }}
    onMouseOut={() => {
      onClick(place_id, false);
    }}>
    {location}
  </div>
);

const Sidebar = ({ visible, data, onClick }) => (
  <div className={`sidebar ${visible ? '' : 'hidden'}`}>
    {data.map(location => (
      <SideBarItem key={location.place_id} {...location} onClick={onClick} />
    ))}
  </div>
);

Sidebar.propTypes = {
  data: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired
};

export default Sidebar;
