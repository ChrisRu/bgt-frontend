import React, { Component } from 'react';
import Map from 'react-leaflet/lib/Map';
import TileLayer from 'react-leaflet/lib/TileLayer';
import MarkerComponent from './Marker';
import 'leaflet/dist/leaflet.css';

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
    const { projects, onOpenPopup } = this.props;
    const { lat, lng, zoom, minZoom, tileLayer } = this.state;
    const position = [lat, lng];

    return (
      <React.Fragment>
        <Map center={position} zoom={zoom} minZoom={minZoom}>
          <TileLayer url={tileLayer} />
          {projects.map(project => (
            <MarkerComponent
              onClick={() => onOpenPopup(project.id)}
              key={project.bgtOnNumber}
              {...project}
            />
          ))}
        </Map>
      </React.Fragment>
    );
  }
}
export default MapComponent;
