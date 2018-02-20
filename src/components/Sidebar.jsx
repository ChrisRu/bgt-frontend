import React from 'react';
import PropTypes from 'prop-types';
import chunk from '../util/chunk';

const chunkLocations = data => chunk(data, 'address.neighbourhood');

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

const Sidebar = ({ visible, data, onClick }) => {
  const locations = chunkLocations(data);
  return (
    <div className={`sidebar ${visible ? '' : 'hidden'}`}>
      {Object.keys(locations)
        .sort((a, b) => a.localeCompare(b))
        .map(suburb => (
          <div key={suburb}>
            <h3 className="sidebar--header">{suburb}</h3>
            {locations[suburb].map(location => (
              <SideBarItem
                key={location.place_id}
                {...location}
                onClick={onClick}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

Sidebar.propTypes = {
  data: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Sidebar;
