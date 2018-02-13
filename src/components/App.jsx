import React, { Component } from 'react';
import queryString from 'query-string';
import Header from './Header';
import Map from './Map';
import Sidebar from './Sidebar';
import data from '../assets/mockdata.json';
import geocode from '../util/geocode';
import search from '../util/search';

const theHague = [52.070498, 4.3007];

class App extends Component {
  state = {
    sidebar: false,
    results: [],
    openResults: [],
    origin: theHague,
    searchValue: ''
  };

  toggleSidebar = open => {
    this.setState(({ sidebar }) => ({ sidebar: open }));
  };

  toggleOpenResult = (result, state) => {
    const { openResults } = this.state;

    if (state !== undefined) {
      if (state === false) {
        this.setState({
          openResults: openResults.filter(openResult => openResult !== result)
        });
      } else {
        this.setState({ openResults: [...openResults, result] });
      }

      return;
    }

    if (openResults.includes(result)) {
      this.setState({
        openResults: openResults.filter(openResult => openResult !== result)
      });
    } else {
      this.setState({ openResults: [...openResults, result] });
    }
  };

  async componentWillMount() {
    this.setState({
      results: await Promise.all(
        data.map(async loc => {
          const res = await geocode(loc.location);
          return { ...res[0], ...loc };
        })
      )
    });
  }

  render() {
    const { sidebar, results, openResults, origin, searchValue } = this.state;
    const googleMapURL = 'https://maps.googleapis.com/maps/api/js';
    const googleMapOptions = queryString.stringify({
      v: '3.exp',
      libraries: 'geometry,drawing,places',
      key: process.env.REACT_APP_GOOGLE_API_KEY
    });

    const filteredResults = results.map(result => ({
      ...result,
      open: openResults.includes(result.place_id),
      hidden: search(searchValue, result.location)
    }));

    return (
      <div className="App">
        <Header
          toggleSidebar={this.toggleSidebar}
          onSearch={searchValue => this.setState({ searchValue })}
        />
        <Sidebar
          data={filteredResults}
          visible={sidebar}
          onClick={this.toggleOpenResult}
        />
        <Map
          googleMapURL={`${googleMapURL}?${googleMapOptions}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          data={filteredResults.filter(res => res.hidden)}
          origin={origin}
          onClick={this.toggleOpenResult}
        />
      </div>
    );
  }
}

export default App;
