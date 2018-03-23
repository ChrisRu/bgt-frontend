import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import ContentMap from './content/map/Map';
import ContentList from './content/Table';
import Dashboard from './content/Dashboard';
import Header from './content/header/Header';
import Sidebar from './content/Sidebar';

import CreateProjectModal from './modals/project/Create';
import Login from './modals/Login';
import ProjectModal from './modals/project/Project';

import CreateButton from './util/buttons/CreateButton';

import { getJWT } from './util/functions/auth';
import HTTP from './util/services/http';

export const RootContext = React.createContext();

class App extends Component {
  state = {
    showCreateProjectModal: false,
    filter: null,
    authenticated: getJWT(),
    searchValue: '',
    projects: [],
    openProjectId: null
  };

  async componentDidMount() {
    const authEnv = process.env.REACT_APP_AUTHENTICATE;
    const ignoreAuthentication = !authEnv || authEnv.toLowerCase() === 'false';

    const authenticated =
      ignoreAuthentication || (await HTTP.user.authenticated());

    this.login(authenticated);
  }

  openPopup = id => {
    this.setState({ openProjectId: id });
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

  login = async authenticated => {
    this.setState({ authenticated });

    if (authenticated) {
      this.props.history.push('/');
      return this.getProjects();
    }
  };

  render() {
    const { showCreateProjectModal, openProjectId, authenticated } = this.state;
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
        <div className="app">
          <Header
            showSearch={!pathname.startsWith('/dashboard')}
            onSearch={searchValue => this.setState({ searchValue })}
            onFilter={filter => this.setState({ filter })}
          />

          <div className="app__content">
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

            <CreateProjectModal
              visible={showCreateProjectModal}
              onClose={createdNew => {
                this.setState({ showCreateProjectModal: false });

                if (createdNew) {
                  this.getProjects();
                }
              }}
            />

            <ProjectModal
              visible={openProjectId}
              onClose={() => this.setState({ openProjectId: null })}
              getData={() =>
                this.state.projects.find(
                  project => project.id === this.state.openProjectId
                )
              }
            />
          </div>
        </div>
      </RootContext.Provider>
    );
  }
}

export default withRouter(App);
