import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';

const MarkerPopup = ({ lat, lon, display_name }) => {
  if (!lat || !lon) {
    return null;
  }

  return (
    <Marker position={[lat, lon]}>
      <Popup>
        <span>{display_name}</span>
      </Popup>
    </Marker>
  );
};

const StreetHighlight = ({ polygonpoints, place_id, display_name }) => {
  if (!polygonpoints) {
    return null;
  }

  return (
    <Polyline positions={polygonpoints.map(([x, y]) => [y, x])} color="red">
      <Popup>
        <span>{display_name}</span>
      </Popup>
    </Polyline>
  );
};

const TaskMap = ({ data, origin }) =>
  console.log(data) || (
    <Map center={origin} zoom={13} animate={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map(street =>
        [
          <StreetHighlight key={street.place_id} {...street} />,
          <MarkerPopup key={street.osm_id} {...street} />
        ].filter(el => el)
      )}
    </Map>
  );

TaskMap.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number, PropTypes.number))
    .isRequired,
  origin: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired
};

export default TaskMap;
