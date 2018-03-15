import React, { Component } from 'react';
import Map from 'react-leaflet/lib/Map';
import TileLayer from 'react-leaflet/lib/TileLayer';
import Marker from 'react-leaflet/lib/Marker';
import Tooltip from 'react-leaflet/lib/Tooltip';
import { icon } from 'leaflet/src/layer/marker/Icon';
import 'leaflet/dist/leaflet.css';

const MarkerComponent = ({
  bgtOnNumber,
  status,
  description,
  latitude,
  longtitude
}) => (
  <Marker
    position={[Number(latitude), Number(longtitude)]}
    icon={icon({
      iconUrl: process.env.PUBLIC_URL + '/marker-red.png',
      iconSize: [32, 32],
      iconAnchor: [14, 11],
      popupAnchor: [48, 48]
    })}
    onClick={() => alert('test')}>
    <Tooltip>
      <React.Fragment>
        <h3>{bgtOnNumber}</h3>
        <span>{status}</span>
        <p>{description}</p>
      </React.Fragment>
    </Tooltip>
  </Marker>
);

class MapComponent extends Component {
  state = {
    lat: 52.0704978,
    lng: 4.3006999,
    zoom: 12,
    minZoom: 8,
    tileLayer:
      'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857/{z}/{x}/{y}.png'
  };

  render() {
    const { projects } = this.props;
    const { lat, lng, zoom, minZoom, tileLayer } = this.state;
    const position = [lat, lng];

    return (
      <Map center={position} zoom={zoom} minZoom={minZoom}>
        <TileLayer url={tileLayer} />
        {projects.map(project => (
          <MarkerComponent key={project.bgtOnNumber} {...project} />
        ))}
      </Map>
    );
  }
}
export default MapComponent;
