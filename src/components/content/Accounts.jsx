import React, { Component } from 'react';

import Form from '../forms/Form';
import user from '../forms/models/user';
import Table from '../forms/components/Table';
import { SaveIcon } from '../util/static/icons';
import HTTP from '../util/services/http';

class Accounts extends Component {
  state = {
    user: {}
  };

  async componentDidMount() {
    const user = await HTTP.user.get();
    console.log(user);
    this.setState({ user });
  }

  render() {
    return (
      <div>
        <div className="dashboard__item dashboard__item--account">
          <h3 className="dashboard__title">Huidige gebruiker</h3>
          <Table form={user.form} data={this.state.user} />
        </div>
        <div className="dashboard__item dashboard__item--account">
          <h3 className="dashboard__title">Maak nieuwe gebruiker</h3>
          <Form
            ref={form => {
              this.form = form;
            }}
            successMessage="Gebuiker aangemaakt"
            form={user.form}
            onSubmit={user.submit}
            onClose={() => {}}
          />
          <button
            className="button button--confirm"
            onClick={() => {
              this.form.submit();
            }}
          >
            <SaveIcon />
            <span>Creeer</span>
          </button>
        </div>
      </div>
    );
  }
}

export default Accounts;
