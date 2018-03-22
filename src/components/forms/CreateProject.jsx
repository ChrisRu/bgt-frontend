import React, { Component } from 'react';
import { WarningIcon } from '../../util/icons';
import HTTP from '../../util/http';
import Show from '../util/Show';
import throttle from 'lodash/throttle';
import SelectAsync from 'react-select/lib/Async';
import Select from 'react-select/lib/Select';
import 'react-select/dist/react-select.css';

export const FormInput = props => {
  const { input, type, apiName, onChange, placeholder, value } = props;

  console.log(props);

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

    case 'select': {
      if (props.switch.loadOptions) {
        const {
          loadOptions,
          labelKey,
          valueKey,
          value,
          onValueClick
        } = props.switch;

        return (
          <SelectAsync
            multi={false}
            backspaceRemoves={false}
            placeholder="Zoek..."
            searchPromptText="Typ om te zoeken"
            backspaceToRemoveMessage="Druk op backspace om {last label} te verwijderen"
            clearAllText="Verwijder alle inhoud"
            clearValueText="Verwijder inhoud"
            noResultsText="Geen resultaten"
            loadingPlaceholder="Locaties ophalen..."
            loadOptions={throttle(loadOptions, 800)}
            labelKey={labelKey}
            valueKey={valueKey}
            value={value(props)}
            onChange={props.switch.onChange(props)}
            onValueClick={onValueClick(props)}
          />
        );
      } else {
        const {
          options,
          value,
          valueKey,
          labelKey,
          onValueClick
        } = props.switch;

        return (
          <Select
            multi={false}
            backspaceRemoves={false}
            placeholder="Zoek..."
            backspaceToRemoveMessage="Druk op backspace om {last label} te verwijderen"
            clearAllText="Verwijder alle inhoud"
            clearValueText="Verwijder inhoud"
            noResultsText="Geen resultaten"
            value={value(props)}
            valueKey={valueKey}
            labelKey={labelKey}
            options={options.map(option => ({ value: option, label: option }))}
            onChange={props.switch.onChange(props)}
            onValueClick={onValueClick(props)}
          />
        );
      }
    }
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
    partial: false,
    formInfo: [
      {
        name: 'BGT Nummer',
        apiName: 'bgtOnNumber',
        placeholder: '123456',
        input: 'input',
        type: 'text',
        value: ({ value }) => ({ value })
      },
      {
        name: 'Locatie',
        apiName: 'location',
        placeholder: 'Duindorp, Den Haag',
        input: 'select',
        type: 'text',
        switch: {
          value: ({ value }) => ({ display_name: value }),
          onChange: ({ onChange, apiName }) => e => {
            onChange({
              target: {
                name: apiName,
                value: e ? e.display_name : ''
              }
            });
          },
          onValueClick: ({ onChange, apiName }) => e => {
            onChange({
              target: {
                name: apiName,
                value: e ? e.display_name : ''
              }
            });
          },
          valueKey: 'display_name',
          labelKey: 'display_name',
          loadOptions: input =>
            HTTP.geo.code(input).then(options => ({ options }))
        }
      },
      {
        name: 'Status',
        apiName: 'status',
        placeholder: 'BAG',
        input: 'select',
        type: 'text',
        switch: {
          value: ({ value }) => ({ value }),
          valueKey: 'value',
          labelKey: 'value',
          options: [
            'Te Archiveren',
            'Te Verwerken',
            'Verwerkt',
            'Gestart',
            'Bij Meetburo',
            'Meetmap ok'
          ],
          onChange: ({ onChange, apiName }) => e => {
            onChange({
              target: {
                name: apiName,
                value: e ? e.value : ''
              }
            });
          },
          onValueClick: ({ onChange, apiName }) => e => {
            onChange({
              target: {
                name: apiName,
                value: e ? e.value : ''
              }
            });
          }
        }
      },
      {
        name: 'Beschrijving',
        apiName: 'description',
        placeholder: 'Meet project in Den Haag',
        input: 'textarea',
        type: 'text',
        value: ({ value }) => ({ value })
      },
      {
        name: 'Categorie',
        apiName: 'category',
        placeholder: 'nieuwbouw',
        input: 'select',
        type: 'text',
        switch: {
          value: ({ value }) => ({ value }),
          valueKey: 'value',
          labelKey: 'value',
          options: [
            'BAG',
            'Nieuwbouw',
            'Aanbouw',
            'Wijkmap',
            'Profiel',
            'Openbare ruimte'
          ],
          onChange: ({ onChange, apiName }) => e => {
            onChange({
              target: {
                name: apiName,
                value: e ? e.value : ''
              }
            });
          },
          onValueClick: ({ onChange, apiName }) => e => {
            onChange({
              target: {
                name: apiName,
                value: e ? e.value : ''
              }
            });
          }
        }
      }
    ]
  };

  componentWillMount() {
    this.setState({
      data: this.props.data || {},
      partial: !!this.props.data
    });
  }

  submit = () => {
    this.setState({ loading: true });

    if (this.state.partial) {
      return HTTP.projects
        .edit(this.state.data)
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
    } else {
      return HTTP.projects
        .create(this.state.data)
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
    }
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
