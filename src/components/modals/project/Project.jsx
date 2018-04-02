import React, { Component } from 'react';

import Timeline from './components/Timeline';
import Categories from './components/Categories';
import Modal from '../Modal';
import Form from '../../forms/Form';
import HTTP from '../../util/services/http';
import { parseLocation } from '../../util/functions/location';
import { EditIcon, SaveIcon, TrashIcon } from '../../util/static/icons';

import project from '../../forms/models/project';
import models from '../../forms/models';
import Table from '../../forms/components/Table';

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

class Project extends Component {
  state = {
    locationName: null,
    editing: false,
    isFetching: false,
    info: null,
    openIndex: []
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

  openItem = (index, toggle = false) => {
    if (toggle && this.state.openIndex.includes(index)) {
      return this.closeItem(index);
    }

    this.setState(({ openIndex }) => ({
      openIndex: [...openIndex, index]
    }));
  };

  closeItem = index => {
    this.setState(({ openIndex }) => ({
      openIndex: openIndex.filter(i => i !== index)
    }));
  };

  render() {
    const { info, locationName, editing, openIndex } = this.state;
    const { visible } = this.props;
    const { bgtOnNumber } = info || {};

    const data = { ...info, location: locationName };

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
              data={data}
            />
          ) : (
            <div className="modal__popup">
              <Table form={project.form} data={data} />
              <Timeline
                onOpen={this.openItem}
                models={models}
                openIndex={openIndex}
              />
              <Categories
                onOpen={this.openItem}
                onClose={this.closeItem}
                models={models}
                openIndex={openIndex}
              />
            </div>
          )
        }
      />
    );
  }
}

export default Project;
