import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Map extends Component {
  componentDidMount() {
    const { Pdok } = window;

    Pdok.addcss(
      'http://geonovum.github.io/pdokkaart/api/styles/default/style.css'
    );
    Pdok.addcss('http://geonovum.github.io/pdokkaart/api/styles/api.css');

    let api;
    Pdok.ready(() => {
      const getConfig = () => ({
        mapdiv: 'map_1394',
        zoom: 6,
        showlayerswitcher: false,
        loc: '89507.84, 459172.4',
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

          <Style id="style_1390">
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
          </Style>

          <Style id="style_1394">
            <PolyStyle>
              <color>3ffffff</color>
              <fill>1</fill>
            </PolyStyle>
            <IconStyle>
              <Icon>
                <href>http://kaart.pdok.nl/api/markertypes/flag-blue.png</href>
              </Icon>
              <scale>1</scale>
            </IconStyle>
          </Style>

          <Folder>
            <Placemark>
              <name>titel</name>
              <description>beschrijving</description>
              <styleUrl>#style_1390</styleUrl>
              <Point>
                <coordinates>4.357034253671091,52.10746644544081</coordinates>
              </Point>
              <ExtendedData>
                <Data name="styletype">
                  <value>mt8</value>
                </Data>
              </ExtendedData>
            </Placemark>
            <Placemark>
              <name>&amp;nbsp;</name>
              <description>&amp;nbsp;</description>
              <styleUrl>#style_1394</styleUrl>
              <Point>
                <coordinates>4.326509088699442,52.070953317013014</coordinates>
              </Point>
              <ExtendedData>
                <Data name="styletype">
                  <value>mt7</value>
                </Data>
              </ExtendedData>
            </Placemark>
          </Folder>
        </Document>
      </kml>`
      });

      api = new Pdok.Api(getConfig());
    });
  }

  render() {
    return <div id="map_1394" className="olMap fullscreen" />;
  }
}

Map.propTypes = {};

export default Map;
