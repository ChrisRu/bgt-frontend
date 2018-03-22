import React from 'react';
import Marker from 'react-leaflet/lib/Marker';
import Tooltip from 'react-leaflet/lib/Tooltip';
import { icon } from 'leaflet/src/layer/marker/Icon';

const MarkerComponent = ({
  id,
  bgtOnNumber,
  status,
  description,
  latitude,
  longtitude,
  onClick
}) => (
  <Marker
    position={[Number(latitude), Number(longtitude)]}
    icon={icon({
      iconUrl: `${process.env.PUBLIC_URL}/marker-${
        ['red', 'yellow', 'green'][Math.floor(Math.random() * 3)]
      }.png`,
      iconSize: [32, 32],
      iconAnchor: [14, 11],
      popupAnchor: [48, 48]
    })}
    onClick={() => onClick(id)}
  >
    <Tooltip>
      <React.Fragment>
        <h3>{bgtOnNumber}</h3>
        <span>{status}</span>
        <p>{description}</p>
      </React.Fragment>
    </Tooltip>
  </Marker>
);

export default MarkerComponent;
