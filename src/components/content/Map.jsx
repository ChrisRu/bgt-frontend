import React from 'react';
import PropTypes from 'prop-types';

import withScriptjs from 'react-google-maps/lib/withScriptjs';
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';
import GoogleMap from 'react-google-maps/lib/components/GoogleMap';
import Marker from 'react-google-maps/lib/components/Marker';
import InfoWindow from 'react-google-maps/lib/components/InfoWindow';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

import mapsStyles from '../../assets/maps-styles.json';

const InfoMarker = ({
  lat,
  lon,
  polygonpoints,
  place_id,
  location,
  category,
  onderweg,
  open,
  onClick
}) => (
  <Marker
    position={{ lat: Number(lat), lng: Number(lon) }}
    onClick={() => {
      onClick(place_id);
    }}>
    {open && (
      <InfoWindow>
        <div>
          <h3 style={{ margin: 0 }}>{location}</h3>
          <p style={{ marginTop: '3px', marginBottom: 0 }}>
            <span>Categorie: {category}</span>
            <br />
            <span>Onderweg: {onderweg}</span>
          </p>
        </div>
      </InfoWindow>
    )}
  </Marker>
);

const TaskMap = withScriptjs(
  withGoogleMap(({ data, origin, onClick }) => (
    <GoogleMap
      defaultCenter={{ lat: Number(origin[0]), lng: Number(origin[1]) }}
      defaultZoom={13}
      options={{
        styles: mapsStyles
      }}>
      <MarkerClusterer averageCenter enableRetinaIcons gridSize={30}>
        {data.map(location => (
          <InfoMarker key={location.place_id} {...location} onClick={onClick} />
        ))}
      </MarkerClusterer>
    </GoogleMap>
  ))
);

TaskMap.propTypes = {
  data: PropTypes.array.isRequired,
  origin: PropTypes.arrayOf(PropTypes.number).isRequired,
  onClick: PropTypes.func.isRequired
};

export default TaskMap;
