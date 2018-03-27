import React, { Component } from 'react';
import classnames from 'classnames';

import Category from './category/Category';
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
              <div className="timeline">
                {models.map((form, index) => (
                  <React.Fragment key={form.type}>
                    <div
                      className={classnames('timeline__bulb', {
                        active: index === 0
                      })}
                    >
                      <span className="timeline__bulb-content">
                        {index + 1}
                      </span>
                      <span className="timeline__bulb-type">{form.name}</span>
                    </div>
                    <span
                      className={classnames('timeline__arrow', {
                        active: index === 0
                      })}
                    />
                  </React.Fragment>
                ))}
              </div>
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
