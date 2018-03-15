import React, { Component } from 'react';
import PropTypes from 'prop-types';

window.alert = function() {};

window.projects = [];
const ready = () => {
  const { Pdok: { Api } } = window;

  const convertPointToXML = ({ bgtOnNumber, description, latitude, longtitude, color }) => {
    const id = String(Date.now()) + String(Math.floor(Math.random() * 10));

    let colorCode;
    switch (Math.floor(Math.random() * 3)) {
      case 1:
        colorCode = 'mt1';
        break;
      case 2:
        colorCode = 'mt2';
        break;
      case 3:
        colorCode = 'mt3';
        break;
      default:
        colorCode = 'mt3';
        break;
    }

    return `
      <Placemark>
        <name>${bgtOnNumber}</name>
        <description>${description}</description>
        <styleUrl>#style_${id}</styleUrl>
        <Point>
          <coordinates>${longtitude}, ${latitude}</coordinates>
        </Point>
        <ExtendedData>
          <Data name="styletype">
            <value>${colorCode}</value>
          </Data>
        </ExtendedData>
      </Placemark>`;
  };

  const config = {
    mapdiv: 'map_1394',
    zoom: 7,
    loc: '82007.84, 453172.4',
    features: `
      <?xml version="1.0" encoding="UTF-8"?>
      <kml xmlns="https://earth.google.com/kml/2.2">
        <Document>
          <name>BGT</name>
          <description>Kaart van de BGT metingen</description>
          <Folder>
            ${window.projects.map(convertPointToXML)}
          </Folder>
        </Document>
      </kml>`
  };

  const setImage = (index, color) => {
    const { PUBLIC_URL } = process.env;
    const { defaultStyles } = window.Pdok.Api.prototype;

    defaultStyles[index].externalGraphic = `${PUBLIC_URL}/marker-${color}.png`;
    defaultStyles[index].graphicYOffset = -32;
  };

  setImage(0, 'red');
  setImage(1, 'yellow');
  setImage(2, 'green');

  /* const api = */ new Api(config);
};

class Map extends Component {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    window.projects = this.props.projects;
    document.getElementById('map_1394').innerHTML = '';
    window.Pdok.ready(ready);
  }

  render() {
    return <div id="map_1394" className="olMap fullscreen" />;
  }
}

Map.propTypes = {
  markers: PropTypes.array
};

export default Map;
