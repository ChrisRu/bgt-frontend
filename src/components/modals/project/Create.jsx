import React, { Component } from 'react';

import Modal from '../Modal';
import CreateProject from '../../forms/CreateProject';
import { PlusIcon } from '../../util/static/icons';

class CreateProjectModal extends Component {
  render() {
    const { visible, onClose } = this.props;

    return (
      <Modal
        visible={visible}
        onClose={onClose}
        title={
          <React.Fragment>
            <PlusIcon />
            <span>Maak een nieuw project</span>
          </React.Fragment>
        }
        actions={[
          {
            type: 'cancel',
            name: 'Annuleer',
            onClick: onClose
          },
          {
            type: 'confirm',
            name: 'Creëer',
            onClick: 'submit'
          }
        ]}
        render={setRef => <CreateProject ref={setRef} onClose={onClose} />}
      />
    );
  }
}

export default CreateProjectModal;
