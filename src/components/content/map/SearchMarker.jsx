import React from 'react';
import Marker from 'react-leaflet/lib/Marker';
import Tooltip from 'react-leaflet/lib/Tooltip';
import { icon } from 'leaflet';

import convertRdToGeo from '../../util/functions/coordinates';

const SearchMarkerComponent = ({
  displayString,
  geometry: { coordinates: [lat, lon] },
  objectId
}) => (
  <Marker
    position={convertRdToGeo(lat, lon)}
    icon={icon({
      iconUrl: `${process.env.PUBLIC_URL}/marker-blue.png`,
      iconSize: [32, 32],
      iconAnchor: [14, 11],
      popupAnchor: [48, 48]
    })}
  >
    <Tooltip>
      <React.Fragment>
        <h3>{displayString}</h3>
      </React.Fragment>
    </Tooltip>
  </Marker>
);

export default SearchMarkerComponent;
