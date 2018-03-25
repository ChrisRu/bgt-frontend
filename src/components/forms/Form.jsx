import React, { Component } from 'react';

import FormControl from './components/FormControl';
import Confirm from '../modals/Confirm';
import { WarningIcon } from '../util/static/icons';
import Show from '../util/Show';
import Spinner from '../util/Spinner';

class Form extends Component {
  state = {
    loading: false,
    error: null,
    data: {},
    partial: false,
    openRemove: false
  };

  componentWillMount() {
    this.setState({
      data: this.props.data || {},
      partial: !!this.props.data
    });
  }

  openRemove = () => {
    this.setState({ openRemove: true });
  };

  remove = () => {
    alert('REMOVED');
  };

  submit = () => {
    this.setState({ loading: true });

    return this.props
      .submit(this.state.data)
      .then(() => {
        this.setState({
          data: {},
          loading: false
        });
        this.props.onClose(true);
      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false
        });
      });
  };

  onInputChange = event => {
    if (event.persist) {
      event.persist();
    }

    this.setState(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        [event.target.name]: event.target.value
      }
    }));
  };

  getErrorMessage(error) {
    switch (error.message) {
      case 'Failed to fetch':
        return 'Kan niet met de server verbinden';
      default:
        return error.userMessage || error.message;
    }
  }

  render() {
    const { error, loading, data, openRemove } = this.state;
    const { form } = this.props;

    return (
      <div className="modal__content form">
        {loading ? (
          <Spinner />
        ) : (
          form.map(item => (
            <FormControl
              key={item.apiName}
              {...item}
              onChange={this.onInputChange}
              value={data[item.apiName] || ''}
            />
          ))
        )}
        <Show
          visible={error}
          render={() => (
            <div className="login__error form__error">
              <WarningIcon />
              <span>{this.getErrorMessage(error)}</span>
            </div>
          )}
        />
        <Confirm
          visible={openRemove}
          onConfirm={this.remove}
          onClose={() => this.setState({ openRemove: false })}
        />
      </div>
    );
  }
}

export default Form;
