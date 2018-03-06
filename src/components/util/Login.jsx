import React, { Component } from 'react';
import Logo from '../../assets/logos/bgt.png';
import { authenticate, setJWT } from '../../util/auth';
import { WarningIcon } from '../../util/icons';

class Login extends Component {
  state = {
    username: '',
    password: '',
    remember: true,
    loading: false,
    error: null
  };

  submit = async event => {
    event.preventDefault();

    const { username, password, remember } = this.state;

    this.setState({ loading: true });

    return authenticate(username, password, remember)
      .then(({ token }) => {
        if (remember) {
          setJWT(token);
        }

        this.props.onLogin(true);
      })
      .catch(error => {
        this.setState({ loading: false, error });

        setTimeout(() => {
          this.setState({ loading: true });

          setTimeout(() => {
            this.props.onLogin(true);
          }, 3000);
        }, 5000);
      });
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: null });
  };

  getErrorMessage = error => {
    switch (error.message) {
      case 'Failed to fetch':
        return 'We kunnen momenteel helaas niet met de server verbinden';
      default:
        return 'Gebruikersnaam of wachtwoord is incorrect ingevuld';
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
            />
            <input
              placeholder="Wachtwoord"
              className="login--input"
              type="password"
              name="password"
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
