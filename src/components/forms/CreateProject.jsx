import React, { Component } from 'react';
import { WarningIcon } from '../../util/icons';
import { fetchAPI } from '../../util/auth';
import Show from '../util/Show';

export const FormItem = ({
  name,
  input,
  placeholder,
  apiName,
  type,
  options,
  onChange
}) => (
  <div className="form--item">
    <label className="label" htmlFor={apiName}>
      {name}
    </label>
    {
      {
        input: (
          <input
            onChange={onChange}
            id={apiName}
            name={apiName}
            placeholder={placeholder}
            type={type}
            className="input"
          />
        ),
        textarea: (
          <textarea
            onChange={onChange}
            id={apiName}
            rows={5}
            name={apiName}
            placeholder={placeholder}
            type={type}
            className="input"
          />
        ),
        select: (
          <select
            onChange={onChange}
            id={apiName}
            rows={5}
            name={apiName}
            placeholder={placeholder}
            type={type}
            className="input"
          >
            {(options || []).map(option => (
              <option value={option.apiName}>{option.name}</option>
            ))}
          </select>
        )
      }[input]
    }
  </div>
);

class CreateProject extends Component {
  state = {
    loading: false,
    error: null,
    data: {},
    formInfo: [
      {
        name: 'BGT Nummer',
        apiName: 'BGTonNumber',
        placeholder: '123456',
        input: 'input',
        type: 'text'
      },
      {
        name: 'Locatie',
        apiName: 'location',
        placeholder: 'Duindorp, Den Haag',
        input: 'input',
        type: 'text'
      },
      {
        name: 'Status',
        apiName: 'status',
        placeholder: 'Actief',
        input: 'input',
        type: 'text'
      },
      {
        name: 'Beschrijving',
        apiName: 'description',
        placeholder: 'Meet project in Den Haag',
        input: 'textarea',
        type: 'text'
      },
      {
        name: 'Categorie',
        apiName: 'category',
        placeholder: 'nieuwbouw',
        input: 'input',
        type: 'text'
      }
    ]
  };

  submit = () => {
    this.setState({ loading: true });
    return fetchAPI('/projects', 'POST', this.state.data)
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
    event.persist();

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
    const { formInfo, error, loading } = this.state;

    return (
      <div className="modal--content form">
        {loading ? (
          <div className="spinner">
            <div className="dot1" />
            <div className="dot2" />
          </div>
        ) : (
          formInfo.map(item => (
            <FormItem
              key={item.apiName}
              {...item}
              onChange={this.onInputChange}
            />
          ))
        )}
        <Show
          visible={error}
          render={() => (
            <div className="login--error form--error">
              <WarningIcon />
              <span>{this.getErrorMessage(error)}</span>
            </div>
          )}
        />
      </div>
    );
  }
}

export default CreateProject;
