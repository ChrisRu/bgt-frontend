import React, { Component } from 'react';

import FormControl from './components/FormControl';
import Confirm from '../modals/Confirm';
import { WarningIcon, CheckIcon } from '../util/static/icons';
import Show from '../util/Show';
import Spinner from '../util/Spinner';

class Form extends Component {
  state = {
    loading: false,
    error: null,
    success: null,
    data: {},
    partial: false,
    openRemove: false
  };

  static getDerivedStateFromProps(nextProps, nextState) {
    return {
      ...nextState,
      data: nextProps.data || {},
      partial: !!nextProps.data
    };
  }

  openRemove = () => {
    this.setState({ openRemove: true });
  };

  remove = () => {
    this.props.onRemove(this.state.data.id);
  };

  submit = () => {
    this.setState({ loading: true });

    const { data } = this.state;

    return this.props
      .onSubmit(data, !data.id)
      .then(() => {
        this.setState({
          data: {},
          loading: false,
          success: this.props.successMessage
        });

        if (this.props.onClose) {
          this.props.onClose(true);
        }
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

    this.setState(
      prevState => ({
        ...prevState,
        error: null,
        success: null,
        data: {
          ...prevState.data,
          [event.target.name]: event.target.value
        }
      }),
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.data);
        }
      }
    );
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
    const { error, loading, data, openRemove, success } = this.state;
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
              value={data[item.apiName]}
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
        <Show
          visible={success}
          render={() => (
            <div className="login__success form__success">
              <CheckIcon />
              <span>{success}</span>
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
