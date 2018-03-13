import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import ContentMap from './content/Map';
import ContentList from './content/Table';
import Dashboard from './content/Dashboard';

import Login from './util/Login';
import Header from './util/Header';
import Sidebar from './util/Sidebar';
import Modal from './util/Modal';
import CreateButton from './util/CreateButton';

import { isAuthenticated, getJWT } from '../util/auth';

class App extends Component {
  state = {
    create: false,
    filter: null,
    authenticated: getJWT(),
    searchValue: ''
  };

  async componentDidMount() {
    this.setState({ authenticated: await isAuthenticated() });
  }

  closeModal = () => {
    this.setState({ create: false });
  };

  login = authenticated => {
    this.setState({ authenticated });
  };

  render() {
    const { create, authenticated } = this.state;
    const { location: { pathname } } = this.props;

    if (authenticated) {
      return (
        <div className="App">
          <Header
            showSearch={!pathname.startsWith('/dashboard')}
            onSearch={searchValue => this.setState({ searchValue })}
            onFilter={filter => this.setState({ filter })}
          />

          <div className="App--content">
            <Sidebar />

            <Switch>
              <Route path="/dashboard" render={() => <Dashboard />} />
              <Route path="/kaart" render={() => <ContentMap />} />
              <Route path="/lijst" render={() => <ContentList />} />
              <Redirect exact from="/" to="/kaart" />
            </Switch>

            <CreateButton onClick={() => this.setState({ create: true })} />

            <Modal
              visible={create}
              onClose={this.closeModal}
              title="Maak een nieuw project"
              actions={[
                {
                  type: 'cancel',
                  name: 'Annuleer',
                  onClick: this.closeModal
                },
                {
                  type: 'confirm',
                  name: 'Creeer',
                  onClick: () => alert('create')
                }
              ]}>
              <div className="modal--content">
                <p>Vul hieronder de gegevens in van het nieuwe project</p>
              </div>
            </Modal>
          </div>
        </div>
      );
    }

    return <Login onLogin={this.login} />;
  }
}

export default withRouter(App);
