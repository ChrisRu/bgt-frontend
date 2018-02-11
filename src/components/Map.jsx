import React from 'react';
import PropTypes from 'prop-types';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
} from 'react-google-maps';

const TaskMap = withScriptjs(
  withGoogleMap(({ data, origin }) => (
    <GoogleMap
      defaultCenter={{ lat: Number(origin[0]), lng: Number(origin[1]) }}
      defaultZoom={13}>
      {data.map(
        ({ lat, lon, polygonpoints }) =>
          console.log(data) || [
            <Marker position={{ lat: Number(lat), lng: Number(lon) }} />,
            polygonpoints && <Polyline
              path={polygonpoints.map(([lng, lat]) => ({
                lng: Number(lng),
                lat: Number(lat)
              }))}
            />
          ]
      )}
    </GoogleMap>
  ))
);

TaskMap.propTypes = {
  data: PropTypes.array.isRequired,
  origin: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired
};

export default TaskMap;
