import React, { Component } from 'react';
import classnames from 'classnames';
import Logo from '../../assets/logos/bgt.png';
import { setJWT } from '../../util/auth';
import HTTP from '../../util/http';
import { WarningIcon } from '../../util/icons';
import Spinner from '../util/Spinner';

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
          <div className="modal--logo">
            <img src={Logo} alt="BGT Logo" />
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
              className="input login--input"
              type="text"
              name="username"
              onChange={this.onChange}
            />
            <input
              placeholder="Wachtwoord"
              className="input login--input"
              type="password"
              name="password"
              onChange={this.onChange}
            />
            {error ? (
              <div className="login--error">
                <WarningIcon />
                <span>{this.getErrorMessage(error)}</span>
              </div>
            ) : (
              <button className="login--submit">Log In</button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
