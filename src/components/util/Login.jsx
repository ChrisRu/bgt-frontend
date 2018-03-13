import React, { Component } from 'react';
import Logo from '../../assets/logos/bgt.png';
import { authenticate, setJWT } from '../../util/auth';
import { WarningIcon } from '../../util/icons';

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

    return authenticate(username, password)
      .then(({ token }) => {
        if (!token) {
          throw new Error('No token');
        }

        setJWT(token);
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
          <img src={Logo} alt="BGT Logo" />
          <div className={`spinner ${!loading ? 'hidden' : ''}`}>
            <div className="dot1" />
            <div className="dot2" />
          </div>
          <form
            className={`login ${loading ? 'hidden' : ''}`}
            onSubmit={this.submit}>
            <input
              placeholder="Gebruikersnaam"
              className="login--input"
              type="text"
              name="username"
              onChange={this.onChange}
            />
            <input
              placeholder="Wachtwoord"
              className="login--input"
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
