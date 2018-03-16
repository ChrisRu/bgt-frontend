import React, { Component } from 'react';
import Map from 'react-leaflet/lib/Map';
import TileLayer from 'react-leaflet/lib/TileLayer';
import Marker from 'react-leaflet/lib/Marker';
import Tooltip from 'react-leaflet/lib/Tooltip';
import { icon } from 'leaflet/src/layer/marker/Icon';
import 'leaflet/dist/leaflet.css';
import MapPopup from './MapPopup';
import Show from '../util/Show';

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
      iconUrl: process.env.PUBLIC_URL + '/marker-red.png',
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

class MapComponent extends Component {
  state = {
    lat: 52.0704978,
    lng: 4.3006999,
    zoom: 12,
    minZoom: 8,
    tileLayer:
      'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:3857/{z}/{x}/{y}.png',
    openId: null
  };

  onMarkerClick = id => this.setState({ openId: id });

  getOpen = () => {
    const { openId } = this.state;
    const { projects } = this.props;

    return projects.find(project => project.id === openId);
  };

  render() {
    const { projects } = this.props;
    const { lat, lng, zoom, minZoom, tileLayer, openId } = this.state;
    const position = [lat, lng];

    return (
      <React.Fragment>
        <Map center={position} zoom={zoom} minZoom={minZoom}>
          <TileLayer url={tileLayer} />
          {projects.map(project => (
            <MarkerComponent
              onClick={this.onMarkerClick}
              key={project.bgtOnNumber}
              {...project}
            />
          ))}
        </Map>
        <Show
          visible={openId}
          render={() => (
            <MapPopup
              onClose={() => this.setState({ openId: null })}
              {...this.getOpen()}
            />
          )}
        />
      </React.Fragment>
    );
  }
}
export default MapComponent;
