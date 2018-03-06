import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ready = () => {
  const { Pdok: { Api } } = window;

  const convertPointToXML = ({ name, description, coordinates, color }) => {
    const id = String(Date.now()) + String(Math.floor(Math.random() * 10));

    let colorCode;
    switch (color) {
      case 'red':
        colorCode = 'mt1';
        break;
      case 'yellow':
        colorCode = 'mt2';
        break;
      case 'green':
        colorCode = 'mt3';
        break;
      default:
        colorCode = 'mt4';
        break;
    }

    return `
      <Placemark>
        <name>${name}</name>
        <description>${description}</description>
        <styleUrl>#style_${id}</styleUrl>
        <Point>
          <coordinates>${coordinates}</coordinates>
        </Point>
        <ExtendedData>
          <Data name="styletype">
            <value>${colorCode}</value>
          </Data>
        </ExtendedData>
      </Placemark>`;
  };

  const points = [
    {
      name: 'Zuiderpark',
      description: 'Meting doen bij het zuiderpark',
      coordinates: '4.291874, 52.057805',
      color: 'red'
    },
    {
      name: 'Koningsplein',
      description: 'Meting doen bij het koningsplein',
      coordinates: '4.282862, 52.075715',
      color: 'yellow'
    },
    {
      name: 'Archipelbuurt',
      description: 'Meting doen bij de archipelbuurt',
      coordinates: '4.303425, 52.090194',
      color: 'green'
    },
    {
      name: 'Schildersbuurt-West',
      description: 'Test description',
      coordinates: '4.295929, 52.069097',
      color: 'green'
    }
  ].map(convertPointToXML);

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
            ${points}
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

  const api = new Api(config);
};

class Map extends Component {
  componentDidMount() {
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
