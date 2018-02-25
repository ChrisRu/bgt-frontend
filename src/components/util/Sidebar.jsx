import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapsIcon, ListIcon, DashboardIcon } from '../../util/icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink className="sidebar--item" to="/dashboard">
        <DashboardIcon />
      </NavLink>
      <NavLink className="sidebar--item" to="/kaart">
        <MapsIcon />
      </NavLink>
      <NavLink className="sidebar--item" to="/lijst">
        <ListIcon />
      </NavLink>
    </div>
  );
};

export default Sidebar;
