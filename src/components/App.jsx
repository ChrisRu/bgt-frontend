import React, { Component } from 'react';
import Header from './Header';
import Map from './Map';
import Sidebar from './Sidebar';

const theHague = [52.070498, 4.3007];

class App extends Component {
  state = {
    sidebar: false,
    results: [],
    origin: theHague
  };

  toggleSidebar = open => {
    this.setState(({ sidebar }) => ({ sidebar: open }));
  };

  render() {
    const { sidebar, results, origin } = this.state;
    return (
      <div className="App">
        <Header
          toggleSidebar={this.toggleSidebar}
          onSubmit={origin => this.setState({ origin })}
          onResults={(value, results) => this.setState({ results })}
        />
        <Sidebar data={results} visible={sidebar} />
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          data={results}
          origin={origin}
        />
      </div>
    );
  }
}

export default App;
