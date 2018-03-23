import React, { Component } from 'react';

import Category from './Category';
import Modal from '../Modal';
import CreateProject from '../../forms/CreateProject';
import HTTP from '../../util/services/http';
import { EditIcon, SaveIcon, TrashIcon } from '../../util/static/icons';

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
            <CreateProject
              ref={setRef}
              onClose={this.close}
              data={{ ...info, location: locationName }}
            />
          ) : (
            <div className="modal--popup">
              <p>
                <strong>Categorie:</strong> {category}
              </p>
              <p>
                <strong>Status:</strong> {status}
              </p>
              <p>
                <strong>Beschrijving:</strong> {description}
              </p>
              <p>
                <strong>Locatie:</strong> {locationName}
              </p>
              <div className="categories">
                {[
                  { type: 'voorbereiden', name: 'Voorbereiden', data: {} },
                  { type: 'verkennen', name: 'Verkennen', data: {} },
                  {
                    type: 'controle verkenning',
                    name: 'Controle Verkenning',
                    data: {}
                  },
                  { type: 'grondslag', name: 'Grondslag', data: {} },
                  { type: 'meetmap', name: 'Meetmap' },
                  { type: 'stereokarteren', name: 'Stereokarteren' },
                  { type: 'meten', name: 'Meten' },
                  { type: 'controle_meting', name: 'Controle Meting' },
                  { type: 'verwerken', name: 'Verwerken' },
                  { type: 'eind_controle', name: 'Eind Controle' }
                ].map(info => <Category key={info.type} {...info} />)}
              </div>
            </div>
          )
        }
      />
    );
  }
}

export default Project;
