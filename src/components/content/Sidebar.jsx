import React from 'react';
import { NavLink } from 'react-router-dom';

import { MapsIcon, ListIcon, DashboardIcon } from '../util/static/icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink className="sidebar__item" to="/kaart">
        <MapsIcon />
      </NavLink>
      <NavLink className="sidebar__item" to="/lijst">
        <ListIcon />
      </NavLink>
      <NavLink className="sidebar__item" to="/dashboard">
        <DashboardIcon />
      </NavLink>
    </div>
  );
};

export default Sidebar;
