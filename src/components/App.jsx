import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import ContentMap from './content/Map';
import ContentList from './content/Table';
import Dashboard from './content/Dashboard';

import CreateProject from './forms/CreateProject';

import Login from './modals/Login';
import Header from './util/Header';
import Sidebar from './util/Sidebar';
import Modal from './util/Modal';
import MapPopup from './modals/MapPopup.jsx';
import CreateButton from './util/CreateButton';
import { PlusIcon } from '../util/icons';

import { getJWT } from '../util/auth';
import HTTP from '../util/http';

export const RootContext = React.createContext();

class App extends Component {
  state = {
    create: false,
    filter: null,
    authenticated: getJWT(),
    searchValue: '',
    projects: [],
    openId: null
  };

  async componentDidMount() {
    const authEnv = process.env.REACT_APP_AUTHENTICATE;
    const ignoreAuthentication = !authEnv || authEnv.toLowerCase() === 'false';

    const authenticated =
      ignoreAuthentication || (await HTTP.user.authenticated());

    this.login(authenticated);
  }

  openPopup = id => {
    this.setState({ openId: id });
  };

  getProjects() {
    return HTTP.projects.getAll().then(projects => this.setState({ projects }));
  }

  filterProjects(projects) {
    const { filter } = this.state;

    if (typeof filter === 'function') {
      return projects.filter(filter);
    }

    return projects;
  }

  closeModal = createdNew => {
    this.setState({ create: false });

    if (createdNew) {
      this.getProjects();
    }
  };

  login = async authenticated => {
    this.setState({ authenticated });

    if (authenticated) {
      this.props.history.push('/');
      return this.getProjects();
    }
  };

  getOpen = () => {
    return this.state.projects.find(
      project => project.id === this.state.openId
    );
  };

  render() {
    const { create, openId, authenticated } = this.state;
    const { location: { pathname }, history } = this.props;
    const projects = this.filterProjects(this.state.projects);

    if (!authenticated && !history.location.pathname.includes('/login')) {
      history.push('/login');
    }

    return (
      <RootContext.Provider
        value={{
          authenticated
        }}
      >
        <div className="App">
          <Header
            showSearch={!pathname.startsWith('/dashboard')}
            onSearch={searchValue => this.setState({ searchValue })}
            onFilter={filter => this.setState({ filter })}
          />

          <div className="App--content">
            <Sidebar />

            <Switch>
              <Route
                path="/login"
                render={() => <Login onLogin={this.login} />}
              />
              <Route path="/dashboard" render={() => <Dashboard />} />
              <Route
                path="/kaart"
                render={() => (
                  <ContentMap
                    onOpenPopup={this.openPopup}
                    projects={projects}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div />}
                    containerElement={<div />}
                    mapElement={<div />}
                  />
                )}
              />
              <Route
                path="/lijst"
                render={() => (
                  <ContentList
                    onOpenPopup={this.openPopup}
                    projects={projects}
                  />
                )}
              />
              <Redirect exact from="/" to="/kaart" />
            </Switch>

            <CreateButton onClick={() => this.setState({ create: true })} />

            <Modal
              visible={create}
              onClose={this.closeModal}
              title={
                <React.Fragment>
                  <PlusIcon />
                  <span>Maak een nieuw project</span>
                </React.Fragment>
              }
              actions={[
                {
                  type: 'cancel',
                  name: 'Annuleer',
                  onClick: this.closeModal
                },
                {
                  type: 'confirm',
                  name: 'Creëer',
                  onClick: 'submit'
                }
              ]}
              render={setRef => (
                <CreateProject ref={setRef} onClose={this.closeModal} />
              )}
            />
            <MapPopup
              visible={openId}
              onClose={() => this.setState({ openId: null })}
              getData={this.getOpen}
            />
          </div>
        </div>
      </RootContext.Provider>
    );
  }
}

export default withRouter(App);
