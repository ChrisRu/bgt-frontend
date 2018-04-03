import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import ContentMap from './content/map/Map';
import ContentList from './content/Table';
import Dashboard from './content/Dashboard';
import Header from './content/header/Header';
import Sidebar from './content/Sidebar';
import MeldingenMap from './content/map/MeldingenMap';

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
    searchMarker: null,
    openProjectId: null,
    terugmeldingen: []
  };

  async componentDidMount() {
    const authEnv = process.env.REACT_APP_AUTHENTICATE;
    const ignoreAuthentication =
      authEnv && ['false', '0'].includes(String(authEnv).toLowerCase());

    const authenticated =
      ignoreAuthentication || (await HTTP.user.authenticated());

    if (authenticated === false) {
      this.props.history.push('/login');
    } else {
      this.login(authenticated, false);
    }
  }

  onPositionClick = async key => {
    this.setState({
      searchMarker: await HTTP.geo.getDetails(key).catch(console.error)
    });
  };

  openPopup = id => {
    this.setState({ openProjectId: id });
  };

  getProjects = () => {
    return HTTP.projects.getAll().then(projects => this.setState({ projects }));
  };

  filterProjects(projects) {
    const { filter } = this.state;

    return projects.filter(filter || (() => true));
  }

  login = async (authenticated, redirect = true) => {
    this.setState({ authenticated });

    if (authenticated) {
      if (redirect) {
        this.props.history.push('/');
      }

      return this.getProjects();
    }
  };

  render() {
    const {
      showCreateProjectModal,
      openProjectId,
      authenticated,
      searchMarker
    } = this.state;
    const { location: { pathname } } = this.props;
    const projects = this.filterProjects(this.state.projects || []);

    return (
      <RootContext.Provider
        value={{
          authenticated
        }}
      >
        <div className="app">
          <Header
            showSearch={!pathname.startsWith('/dashboard')}
            onFilter={filter => this.setState({ filter })}
            onPositionClick={this.onPositionClick}
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
                    searchMarker={searchMarker}
                    onOpenPopup={this.openPopup}
                    projects={projects}
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
              <Route
                path="/terugmeldingen"
                render={() => <MeldingenMap searchMarker={searchMarker} />}
              />
              {authenticated ? (
                <Redirect exact strict from="/" to="/kaart" />
              ) : (
                <Redirect to="/login" />
              )}
            </Switch>

            <CreateButton
              onClick={() => this.setState({ showCreateProjectModal: true })}
            />

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
              onReload={this.getProjects}
              getData={() =>
                projects.find(project => project.id === openProjectId)
              }
            />
          </div>
        </div>
      </RootContext.Provider>
    );
  }
}

export default withRouter(App);
