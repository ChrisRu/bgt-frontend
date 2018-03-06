import React, { Component } from 'react';
import Logo from '../../assets/logos/bgt.png';
import { authenticate, setJWT } from '../../util/auth';

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

    await new Promise(r => setTimeout(r, 2000));

    return authenticate(username, password, remember)
      .then(({ token }) => {
        if (remember) {
          setJWT(token);
        }

        this.props.onLogin(true);
      })
      .catch(error => {
        this.props.onLogin(true);
        this.setState({ loading: false, error });
      });
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { loading } = this.state;

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
            <input className="login--input" type="text" name="username" />
            <input className="login--input" type="password" name="password" />
            <button className="login--submit">Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
