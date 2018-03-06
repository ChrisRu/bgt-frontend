import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ready = () => {
  const { Pdok: { Api } } = window;

  const convertPointToXML = ({ name, description, coordinates, color }) => {
    const id = String(Date.now()) + String(Math.floor(Math.random() * 10));

    return {
      style: `
        <Style id="style_${id}">
          <PolyStyle>
            <color>3ffffff</color>
            <fill>1</fill>
          </PolyStyle>
          <IconStyle>
            <Icon>
              <href>http://kaart.pdok.nl/api/markertypes/flag-red.png</href>
            </Icon>
            <scale>1</scale>
          </IconStyle>
        </Style>`,

      placemark: `
        <Placemark>
          <name>${name}</name>
          <description>${description}</description>
          <styleUrl>#style_${id}</styleUrl>
          <Point>
            <coordinates>${coordinates}</coordinates>
          </Point>
          <ExtendedData>
            <Data name="styletype">
              <value>mt8</value>
            </Data>
          </ExtendedData>
        </Placemark>`
    };
  };

  const points = [
    {
      name: 'Zuiderpark',
      description: 'Meting doen bij het zuiderpark',
      coordinates: '4.291874, 52.057805'
    },
    {
      name: 'Koningsplein',
      description: 'Meting doen bij het koningsplein',
      coordinates: '4.282862, 52.075715'
    },
    {
      name: 'Archipelbuurt',
      description: 'Meting doen bij de archipelbuurt',
      coordinates: '4.303425, 52.090194'
    }
  ].map(convertPointToXML);

  const config = {
    mapdiv: 'map_1394',
    zoom: 7,
    showlayerswitcher: false,
    loc: '81507.84, 454172.4',
    baselayers: [
      {
        id: 'BRT',
        visible: true
      },
      {
        id: 'LUFO',
        visible: false
      }
    ],
    markersdef: 'http://kaart.pdok.nl/api/js/pdok-markers.js',
    layersdef: 'http://kaart.pdok.nl/api/js/pdok-layers.js',
    features: `
      <?xml version="1.0" encoding="UTF-8"?>
      <kml xmlns="http://earth.google.com/kml/2.2">
        <Document>
          <name>null</name>
          <description>null</description>
            ${points.map(res => res.style)}
          <Folder>
            ${points.map(res => res.placemark)}
          </Folder>
        </Document>
      </kml>`
  };

  new Api(config);
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
