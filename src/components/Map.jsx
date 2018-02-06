import React from "react";
import PropTypes from "prop-types";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

// https://nominatim.openstreetmap.org/search?q=Frederik+Hendrikstraat+26,Naaldwijk&format=json&polygon=1&addressdetails=1

const TaskMap = ({ points, origin }) => (
  <Map center={origin} zoom={13}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {points.map(position => (
      <Marker key={position[0]} position={position}>
        <Popup>
          <span>
            A pretty CSS3 popup. <br /> Easily customizable.
          </span>
        </Popup>
      </Marker>
    ))}
  </Map>
);

TaskMap.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number, PropTypes.number)
  ).isRequired,
  origin: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired
};

export default TaskMap;
