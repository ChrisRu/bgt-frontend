import React, { Component } from 'react';
import Header from './Header';
import Map from './Map';
import Sidebar from './Sidebar';

const theHague = [52.070498, 4.3007];

class App extends Component {
  state = {
    sidebar: true,
    points: [],
  };

  componentWillMount() {
    this.setState({ points: this.getPoints() });
  }

  getPoints = () =>
    Array(Math.ceil(Math.random() * 10) + 3)
      .fill(0)
      .map(() => theHague.map(val => val + ((Math.random() - 0.25) / 30)));

  toggleSidebar = () => {
    this.setState(({ sidebar }) => ({ sidebar: !sidebar }));
  };

  render() {
    const { sidebar, points } = this.state;
    return (
      <div className="App">
        <Header toggleSidebar={this.toggleSidebar} />
        <Sidebar points={points} visible={sidebar} />
        <Map points={points} origin={theHague} />
      </div>
    );
  }
}

export default App;
