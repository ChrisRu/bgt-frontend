import React, { Component } from 'react';
import Map from 'react-leaflet/lib/Map';
import TileLayer from 'react-leaflet/lib/TileLayer';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { divIcon } from 'leaflet';
import classnames from 'classnames';

import MarkerComponent from './Marker';
import SearchMarker from './SearchMarker';
import convertRdToGeo from '../../util/functions/coordinates';

const getPosition = () => {
  const item = window.localStorage.getItem('position');
  return item ? JSON.parse(item) : { center: [] };
};

class MapComponent extends Component {
  state = {
    lat: getPosition().center[0] || 52.0704978,
    lng: getPosition().center[1] || 4.3006999,
    zoom: getPosition().zoom || 13,
    minZoom: 8,
    tileLayers: {
      Basis:
        'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857/{z}/{x}/{y}.png',
      Pastel:
        'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaartpastel/EPSG:3857/{z}/{x}/{y}.png',
      Grijs:
        'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaartgrijs/EPSG:3857/{z}/{x}/{y}.png',
      Satelliet:
        'https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/Actueel_ortho25/EPSG:3857/{z}/{x}/{y}.jpeg'
    },
    tileLayerIndex: window.localStorage.getItem('tile-layer') || 'Basis'
  };

  createClusterIcon = el => {
    if (!el) {
      return;
    }

    const colors = ['red', 'yellow', 'green', 'gray'];

    const colorIndex = el.getAllChildMarkers().reduce((max, marker) => {
      const { iconUrl } = marker.options.icon.options;

      const index = colors.indexOf(iconUrl.match(/marker-(.+)\./)[1]);
      return index < max ? index : max;
    }, colors.length - 1);

    const clusterColor = colors[colorIndex];

    const iconUrl = `${
      process.env.PUBLIC_URL
    }/cluster-${clusterColor}.png`.replace(' ', '');

    return divIcon({
      html: `
        <span class="map__icon map__icon--${clusterColor}" style="background-image: url(${iconUrl})">
          ${el.getChildCount()}
        </span>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
  };

  getTileLayer = () => {
    const { tileLayerIndex, tileLayers } = this.state;

    return tileLayers[tileLayerIndex] || tileLayers['Basis'];
  };

  setTileLayer = tileLayerIndex => () => {
    this.setState({ tileLayerIndex });
    localStorage.setItem('tile-layer', tileLayerIndex);
  };

  markerClick = project => {
    this.props.onOpenPopup(project.id);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.zoom !== nextState.zoom) {
      return false;
    }

    return true;
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.searchMarker && !Array.isArray(nextProps.searchMarker)) {
      const {
        geometry: { coordinates: [rdLat, rdLon] }
      } = nextProps.searchMarker;

      const [lat, lon] = convertRdToGeo(rdLat, rdLon);
      return { ...nextState, lat, lon };
    }

    return nextState;
  }

  updateViewport = ({ zoom, center }) => {
    window.localStorage.setItem('position', JSON.stringify({ zoom, center }));
    this.setState({ zoom });
  };

  render() {
    const { projects, searchMarker } = this.props;
    const { lat, lng, zoom, minZoom, tileLayers, tileLayerIndex } = this.state;

    return (
      <React.Fragment>
        <Map
          center={[lat, lng]}
          zoom={zoom}
          minZoom={minZoom}
          onViewportChange={this.updateViewport}
        >
          <div className="map__selector">
            {Object.keys(tileLayers).map(layer => (
              <button
                key={layer}
                className={classnames('map__selector-button', {
                  active: tileLayerIndex === layer
                })}
                onClick={this.setTileLayer(layer)}
              >
                {layer}
              </button>
            ))}
          </div>
          <TileLayer url={this.getTileLayer()} />
          <MarkerClusterGroup
            maxClusterRadius={50}
            iconCreateFunction={this.createClusterIcon}
          >
            {projects.map(project => (
              <MarkerComponent
                onClick={() => this.markerClick(project)}
                key={project.id}
                {...project}
              />
            ))}
          </MarkerClusterGroup>
          {searchMarker && !Array.isArray(searchMarker) ? (
            <SearchMarker {...searchMarker} />
          ) : null}
        </Map>
      </React.Fragment>
    );
  }
}
export default MapComponent;
