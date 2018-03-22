import React, { Component } from 'react';
import Modal from '../util/Modal';
import HTTP from '../../util/http';
import { EditIcon, TrashIcon } from '../../util/icons';
import CreateProject from '../forms/CreateProject';

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

class PopupContent extends Component {
  state = {
    locationName: null,
    editing: false,
    info: {}
  };

  edit() {
    this.setState(({ editing }) => ({ editing: !editing }));
    // this.props.updateButton(
    //   <React.Fragment>
    //     <SaveIcon />
    //   </React.Fragment>
    // );
  }

  async componentWillReceiveProps(nextProps) {
    const { longtitude, latitude } = nextProps;

    if (nextProps.visible === true) {
      this.setState({ info: nextProps, isFetching: true });
    }

    if (!longtitude || !latitude) {
      return;
    }

    if (this.state.isFetching) {
      return;
    }

    this.setState({
      locationName: await HTTP.geo.reverse(latitude, longtitude),
      isFetching: false
    });
  }

  parseLocation(location) {
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

  render() {
    const {
      info: { status, description, category },
      locationName,
      editing
    } = this.state;

    if (editing) {
      return <CreateProject />;
    } else {
      return (
        <div className="modal--popup">
          <p>Categorie: {category}</p>
          <p>Status: {status}</p>
          <p>Beschrijving: {description}</p>
          <p>Locatie: {this.parseLocation(locationName)}</p>
        </div>
      );
    }
  }
}

const MapPopup = props => {
  const { bgtOnNumber, onClose } = props;

  const visible = !!props.visible;

  return (
    <Modal
      visible={!!visible}
      onClose={onClose}
      title={`Project ${bgtOnNumber}`}
      actions={[
        {
          type: 'edit',
          name: (
            <React.Fragment>
              <EditIcon />
              <span>Aanpassen</span>
            </React.Fragment>
          ),
          onClick: 'edit',
          align: 'left'
        }
      ]}
      defaultStyle={{ transformOrigin: '0 0' }}
      transitionStyles={transitionStyles}
      render={setRef => (
        <PopupContent {...props} visible={visible} ref={setRef} />
      )}
    />
  );
};

export default MapPopup;
