import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import ContentMap from './content/Map';
import ContentList from './content/Table';
import Dashboard from './content/Dashboard';

import CreateProject from './forms/CreateProject';

import Login from './util/Login';
import Header from './util/Header';
import Sidebar from './util/Sidebar';
import Modal from './util/Modal';
import CreateButton from './util/CreateButton';

import { isAuthenticated, getJWT, fetchAPI } from '../util/auth';

export const RootContext = React.createContext();

class App extends Component {
  state = {
    create: false,
    filter: null,
    authenticated: getJWT(),
    searchValue: '',
    projects: [],
    createProject: {}
  };

  async componentDidMount() {
    const authenticated = await isAuthenticated();

    this.setState({
      authenticated
    });

    if (authenticated) {
      this.setState({
        projects: await this.getProjects()
      });
    }
  }

  getProjects() {
    return fetchAPI('/projects');
  }

  closeModal = () => {
    this.setState({ create: false });
  };

  login = authenticated => {
    this.setState({ authenticated });
  };

  onCreateProjectChange = data => {
    this.setState({ createProject: data });
  };

  getApp() {
    const { create, createProject } = this.state;
    const { location: { pathname } } = this.props;

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
            <Route path="/lijst" render={() => <ContentList data={[]} />} />
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
                onClick: async () => {
                  await fetchAPI('/projects', 'POST', createProject);
                  this.setState({ create: false });
                }
              }
            ]}>
            <CreateProject onChange={this.onCreateProjectChange} />
          </Modal>
        </div>
      </div>
    );
  }

  getLogin() {
    return <Login onLogin={this.login} />;
  }

  render() {
    const { authenticated } = this.state;

    return (
      <RootContext.Provider
        value={{
          authenticated
        }}>
        {authenticated ? this.getApp() : this.getLogin()}
      </RootContext.Provider>
    );
  }
}

export default withRouter(App);
