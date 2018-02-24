import React, { Component } from 'react';
import queryString from 'query-string';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header';
import Map from './Map';
import Sidebar from './Sidebar';
import List from './Table';
import Modal from './Modal';
import CreateButton from './CreateButton';
import data from '../assets/mockdata.json';
import geocode from '../util/geocode';
import { searchKeys } from '../util/search';

const theHague = [52.070498, 4.3007];

class App extends Component {
  state = {
    create: false,
    results: [],
    openResults: [],
    origin: theHague,
    filter: null,
    searchValue: ''
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
    const {
      results,
      openResults,
      origin,
      searchValue,
      create
    } = this.state;
    const googleMapURL = 'https://maps.googleapis.com/maps/api/js';
    const googleMapOptions = queryString.stringify({
      v: '3.exp',
      libraries: 'geometry,drawing,places',
      key: process.env.REACT_APP_GOOGLE_API_KEY
    });

    const filteredResults = results.map(result => ({
      ...result,
      open: openResults.includes(result.place_id),
      hidden: searchKeys(searchValue, result.address)
    }));

    return (
      <div className="App">
        <Header
          onSearch={searchValue => this.setState({ searchValue })}
          onFilter={filter => this.setState({ filter })}
        />
        <div className="App--content">
          <Sidebar />
          <Switch>
            <Route
              path="/kaart"
              render={() => (
                <Map
                  key={2}
                  googleMapURL={`${googleMapURL}?${googleMapOptions}`}
                  loadingElement={<div />}
                  containerElement={<div className="map--container" />}
                  mapElement={<div className="map--element" />}
                  data={filteredResults.filter(res => res.hidden)}
                  origin={origin}
                  onClick={this.toggleOpenResult}
                />
              )}
            />
            <Route
              path="/lijst"
              render={() => (
                <List data={filteredResults.filter(res => res.hidden)} />
              )}
            />
            <Redirect exact from="/" to="/kaart" />
          </Switch>
          <CreateButton onClick={() => this.setState({ create: true })} />
          <Modal
            visible={create}
            onClose={() => this.setState({ create: false })}>
            <div className="content">
              <h2>Maak een nieuw project</h2>
              <p>Vul hieronder de gegevens in van het nieuwe project</p>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
