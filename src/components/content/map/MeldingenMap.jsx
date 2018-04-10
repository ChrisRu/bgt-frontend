import React, { Component } from 'react';
import Map from 'react-leaflet/lib/Map';
import TileLayer from 'react-leaflet/lib/TileLayer';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Marker from 'react-leaflet/lib/Marker';
import Tooltip from 'react-leaflet/lib/Tooltip';
import { divIcon, icon } from 'leaflet';
import classnames from 'classnames';

import SearchMarker from './SearchMarker';
import convertRdToGeo from '../../util/functions/coordinates';
import HTTP from '../../util/services/http';

const MarkerComponent = ({
  lat,
  lon,
  properties: {
    omschrijving,
    tijdstip_registratie,
    toelichting,
    bronhoudernaam,
    meldings_nummer_as_text,
    status
  }
}) => (
  <Marker
    position={[lat, lon]}
    icon={icon({
      iconUrl: `${process.env.PUBLIC_URL}/marker-blue.png`,
      iconSize: [32, 32],
      iconAnchor: [14, 11],
      popupAnchor: [48, 48]
    })}
  >
    <Tooltip>
      <React.Fragment>
        <h3>{meldings_nummer_as_text}</h3>
        {bronhoudernaam && (
          <p>
            Bronhoudernaam: <strong>{bronhoudernaam}</strong>
          </p>
        )}
        {omschrijving && (
          <p>
            Omschrijving: <strong>{omschrijving}</strong>
          </p>
        )}
        {status && (
          <p>
            Status: <strong>{status}</strong>
          </p>
        )}
        {tijdstip_registratie && (
          <p>
            Registratie:{' '}
            <strong>
              {new Date(tijdstip_registratie).toLocaleDateString('nl-NL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </strong>
          </p>
        )}
        {toelichting && (
          <p>
            Toelichting: <strong>{toelichting}</strong>
          </p>
        )}
      </React.Fragment>
    </Tooltip>
  </Marker>
);

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
    tileLayerIndex: localStorage.getItem('tile-layer') || 'Basis',
    meldingen: []
  };

  createClusterIcon = el => {
    if (!el) {
      return;
    }

    const clusterColor = 'green';

    const iconUrl = `${
      process.env.PUBLIC_URL
    }/cluster-${clusterColor}.png`.replace(' ', '');

    return divIcon({
      html: `
        <span class="map__icon map__icon--${clusterColor}" style="background-image: url(${iconUrl})">
          ${el.getChildCount()}
        </span>
      `,
      iconSize: [28, 28]
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

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.zoom !== nextState.zoom) {
      return false;
    }

    return true;
  }

  async componentDidMount() {
    if (this.state.meldingen.length > 0) {
      return;
    }

    const meldingen = await HTTP.geo.getMeldingen();

    this.setState({
      meldingen: (meldingen || []).map(proj => {
        const [lat, lon] = convertRdToGeo(...proj.geometry.coordinates);
        return {
          ...proj,
          lat,
          lon
        };
      })
    });
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
    const { searchMarker } = this.props;
    const {
      lat,
      lng,
      zoom,
      minZoom,
      tileLayers,
      tileLayerIndex,
      meldingen
    } = this.state;

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
            maxClusterRadius={30}
            iconCreateFunction={this.createClusterIcon}
          >
            {meldingen.map(project => (
              <MarkerComponent key={project.id} {...project} />
            ))}
            {searchMarker && !Array.isArray(searchMarker) ? (
              <SearchMarker {...searchMarker} />
            ) : null}
          </MarkerClusterGroup>
        </Map>
      </React.Fragment>
    );
  }
}

export default MapComponent;
