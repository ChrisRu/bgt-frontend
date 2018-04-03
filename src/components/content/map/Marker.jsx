import React from 'react';
import Marker from 'react-leaflet/lib/Marker';
import Tooltip from 'react-leaflet/lib/Tooltip';
import { icon } from 'leaflet';

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const getColor = dateString => {
  if (!dateString || dateString === '0001-01-01T00:00:00+00:00') {
    return 'gray';
  }

  const date = new Date(dateString);

  const colors = [
    {
      color: 'red',
      days: 30 * 5
    },
    {
      color: 'yellow',
      days: 30 * 3
    },
    {
      color: 'green',
      days: -1
    }
  ];

  return colors.find(color => date > addDays(date, color.days)).color;
};

const MarkerComponent = ({
  id,
  bgtOnNumber,
  status,
  description,
  latitude,
  longtitude,
  onClick,
  exploreDate,
  ...rest
}) => (
  <Marker
    position={[Number(latitude), Number(longtitude)]}
    icon={icon({
      iconUrl: `${process.env.PUBLIC_URL}/marker-${getColor(exploreDate)}.png`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [48, 48],
      shadowAnchor: [16, 32]
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
