import React, { Component } from 'react';
import Map from 'react-leaflet/lib/Map';
import TileLayer from 'react-leaflet/lib/TileLayer';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { icon } from 'leaflet';

import MarkerComponent from './Marker';

class MapComponent extends Component {
  state = {
    lat: 52.0704978,
    lng: 4.3006999,
    zoom: 12,
    minZoom: 8,
    tileLayer:
      'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857/{z}/{x}/{y}.png'
  };

  createIcon = el => {
    const clusterColor = ['green', 'yellow', 'red'][el.getAllChildMarkers().reduce((max, marker) => {
      const { iconUrl } = marker.options.icon.options;

      if (iconUrl.includes('green') && max <= 0) {
        return 0;
      } else if (iconUrl.includes('yellow') && max <= 1) {
        return 1;
      } else if (iconUrl.includes('red') && max <= 2) {
        return 2;
      }
      
      return max;
    }, 0)];

    const iconUrl = `${process.env.PUBLIC_URL}/cluster-${clusterColor}.png`;
    return icon({
      iconUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [16, 16]
    });
  }

  render() {
    const { projects, onOpenPopup } = this.props;
    const { lat, lng, zoom, minZoom, tileLayer } = this.state;
    const position = [lat, lng];

    return (
      <React.Fragment>
        <Map center={position} zoom={zoom} minZoom={minZoom}>
          <TileLayer url={tileLayer} />
          <MarkerClusterGroup iconCreateFunction={this.createIcon}>
            {projects.map(project => (
              <MarkerComponent
                onClick={() => onOpenPopup(project.id)}
                key={project.bgtOnNumber}
                {...project}
              />
            ))}
          </MarkerClusterGroup>
        </Map>
      </React.Fragment>
    );
  }
}
export default MapComponent;
