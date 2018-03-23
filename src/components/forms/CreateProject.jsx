import React, { Component } from 'react';

import FormControl from './components/FormControl';
import Confirm from '../modals/Confirm';
import { WarningIcon } from '../util/static/icons';
import HTTP from '../util/services/http';
import Show from '../util/Show';
import Spinner from '../util/Spinner';

class CreateProject extends Component {
  state = {
    loading: false,
    error: null,
    data: {},
    partial: false,
    openRemove: false,
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

  openRemove = () => {
    this.setState({ openRemove: true });
  };

  remove = () => {
    alert('REMOVED');
  };

  submit = () => {
    this.setState({ loading: true });

    return HTTP.projects[this.state.partial ? 'edit' : 'create'](
      this.state.data
    )
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
    const { formInfo, error, loading, data, openRemove } = this.state;

    return (
      <div className="modal__content form">
        {loading ? (
          <Spinner />
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

export default CreateProject;
