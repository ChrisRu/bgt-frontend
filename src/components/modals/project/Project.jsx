import React, { Component } from 'react';

import Category from './category/Category';
import Modal from '../Modal';
import Form from '../../forms/Form';
import HTTP from '../../util/services/http';
import { EditIcon, SaveIcon, TrashIcon } from '../../util/static/icons';

import project from '../../forms/models/project';
import models from '../../forms/models';

const duration = 400;

const transitionStyles = {
  entered: {
    opacity: 1,
    transform: 'scale(1) translate(-50%, -50%)'
  },
  exiting: {
    transition: `
      transform ${duration}ms cubic-bezier(0.750, 0.000, 0.755, 0.900),
      opacity   ${duration}ms cubic-bezier(0.750, 0.000, 0.755, 0.900)
    `
  },
  exited: {
    transition: `
      transform ${duration}ms cubic-bezier(0.750, 0.000, 0.755, 0.900),
      opacity   ${duration}ms cubic-bezier(0.750, 0.000, 0.755, 0.900)
    `,
    opacity: 0,
    transform: 'scale(0) translate(-50%, -50%)'
  }
};

function parseLocation(location) {
  if (!location) {
    return;
  }

  const { address: { road, house_number, city, suburb }, name } = location;

  const res = [];

  if (name) {
    res.push(name);
    res.push(', ');
  }

  if (road) {
    res.push(road);
  }

  if (house_number) {
    res.push(' ');
    res.push(house_number);
  }

  if (city || suburb) {
    res.push(', ');
    res.push(city || suburb);
  }

  return res.join('');
}

class Project extends Component {
  state = {
    locationName: null,
    editing: false,
    isFetching: false,
    info: null
  };

  edit = () => {
    this.setState(({ editing }) => ({ editing: !editing }));
  };

  getUpdateButtons() {
    return this.state.editing
      ? [
          {
            type: 'danger',
            name: (
              <React.Fragment key={3}>
                <TrashIcon />
                <span>Verwijder</span>
              </React.Fragment>
            ),
            onClick: 'openRemove',
            align: 'left'
          },
          {
            type: 'confirm',
            name: (
              <React.Fragment key={2}>
                <SaveIcon />
                <span>Opslaan</span>
              </React.Fragment>
            ),
            onClick: 'submit'
          }
        ]
      : [
          {
            type: 'edit',
            name: (
              <React.Fragment key={1}>
                <EditIcon />
                <span>Aanpassen</span>
              </React.Fragment>
            ),
            onClick: this.edit,
            align: 'left'
          }
        ];
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.info) {
      const info = nextProps.getData();
      if (info) {
        this.setState({ info, isFetching: true });
      }
    }
  }

  async componentDidUpdate() {
    const { info, locationName } = this.state;
    const { visible } = this.props;

    if (!info || !visible || locationName) {
      return;
    }

    const { longtitude, latitude } = info;

    this.setState({
      locationName:
        parseLocation(await HTTP.geo.reverse(latitude, longtitude)) ||
        'Kan locatie niet vinden',
      isFetching: false
    });
  }

  close = (...args) => {
    this.setState({
      isFetching: false,
      locationName: null,
      editing: false,
      info: null
    });
    this.props.onClose(...args);
  };

  render() {
    const { info, locationName, editing } = this.state;
    const { visible } = this.props;
    const { status, description, category, bgtOnNumber } = info || {};

    return (
      <Modal
        visible={!!visible}
        onClose={this.close}
        title={`Project ${bgtOnNumber}`}
        actions={[...this.getUpdateButtons()]}
        defaultStyle={{ transformOrigin: '0 0' }}
        transitionStyles={transitionStyles}
        render={setRef =>
          editing ? (
            <Form
              ref={setRef}
              form={project.form}
              onClose={this.close}
              onSubmit={project.submit}
              data={{ ...info, location: locationName }}
            />
          ) : (
            <div className="modal__popup">
              <table>
                <tr>
                  <td>Categorie:</td>
                  <td>
                    <strong>{category}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>
                    <strong>{status}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Beschrijving:</td>
                  <td>
                    <strong>{description}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Locatie:</td>
                  <td>
                    <strong>{locationName}</strong>
                  </td>
                </tr>
              </table>
              <div className="categories">
                {models.map(form => <Category key={form.type} {...form} />)}
              </div>
            </div>
          )
        }
      />
    );
  }
}

export default Project;
