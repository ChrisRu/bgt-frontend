import React, { Component } from 'react';
import classnames from 'classnames';

import { setJWT } from '../util/functions/auth';
import HTTP from '../util/services/http';
import { WarningIcon } from '../util/static/icons';
import Spinner from '../util/Spinner';
import logo from '../../assets/logos/bgt.png';

class Login extends Component {
  state = {
    username: '',
    password: '',
    loading: false,
    error: null
  };

  submit = event => {
    event.preventDefault();

    const { username, password } = this.state;

    this.setState({ loading: true });

    return HTTP.user
      .authenticate(username, password)
      .then(({ access_token }) => {
        if (!access_token) {
          throw new Error('No token');
        }

        setJWT(access_token);
        this.props.onLogin(true);
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: null });
  };

  getErrorMessage = error => {
    switch (error.message) {
      case 'Failed to fetch':
        return 'We kunnen helaas niet met de server verbinden';
      default:
        return 'Gebruikersnaam of wachtwoord is incorrect';
    }
  };

  render() {
    const { loading, error } = this.state;

    return (
      <div className="modal--login-wrapper">
        <div className="modal modal--login">
          <div className="modal__logo">
            <img src={logo} alt="BGT Logo" />
          </div>
          <div className={classnames('loading', { hidden: !loading })}>
            <Spinner />
          </div>
          <form
            className={classnames('login', { hidden: loading })}
            onSubmit={this.submit}
          >
            <input
              placeholder="Gebruikersnaam"
              className="input login__input"
              type="text"
              name="username"
              onChange={this.onChange}
            />
            <input
              placeholder="Wachtwoord"
              className="input login__input"
              type="password"
              name="password"
              onChange={this.onChange}
            />
            {error ? (
              <div className="login__error">
                <WarningIcon />
                <span>{this.getErrorMessage(error)}</span>
              </div>
            ) : (
              <button className="login__submit">Log In</button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
