import React, { Component } from 'react';
import { WarningIcon } from '../../util/icons';
import { fetchAPI } from '../../util/auth';
import geocode from '../../util/geocode';
import Show from '../util/Show';
import Select from 'react-select/lib/Async';
import 'react-select/dist/react-select.css';

export const FormInput = ({
  input,
  value,
  type,
  apiName,
  onChange,
  placeholder
}) => {
  switch (input) {
    case 'input':
      return (
        <input
          onChange={onChange}
          id={apiName}
          name={apiName}
          placeholder={placeholder}
          type={type}
          className="input"
        />
      );
    case 'textarea':
      return (
        <textarea
          onChange={onChange}
          id={apiName}
          rows={5}
          name={apiName}
          placeholder={placeholder}
          type={type}
          className="input"
        />
      );

    case 'select':
      return (
        <Select
          multi={false}
          value={{ display_name: value }}
          onChange={e => {
            onChange({
              target: {
                name: apiName,
                value: e ? e.display_name : ''
              }
            });
          }}
          onValueClick={e => {
            onChange({
              target: {
                name: apiName,
                value: e ? e.display_name : ''
              }
            });
          }}
          valueKey="display_name"
          labelKey="display_name"
          loadOptions={input => geocode(input).then(options => ({ options }))}
          backspaceRemoves={false}
          placeholder="Zoek..."
          searchPromptText="Typ om te zoeken"
          backspaceToRemoveMessage="Druk op backspace om {last label} te verwijderen"
          clearAllText="Verwijder alle inhoud"
          clearValueText="Verwijder inhoud"
          noResultsText="Geen resultaten"
          loadingPlaceholder="Locaties ophalen..."
        />
      );
    default:
      return null;
  }
};

export const FormControl = props => (
  <div className="form--item">
    <label className="label" htmlFor={props.apiName}>
      {props.name}
    </label>
    <FormInput {...props} />
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
        input: 'select',
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
    const { formInfo, error, loading, data } = this.state;

    return (
      <div className="modal--content form">
        {loading ? (
          <div className="spinner">
            <div className="dot1" />
            <div className="dot2" />
          </div>
        ) : (
          formInfo.map(item => (
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
