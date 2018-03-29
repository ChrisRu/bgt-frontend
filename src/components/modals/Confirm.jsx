import React from 'react';

import Modal from './Modal';
import { WarningIcon } from '../util/static/icons';

const Confirm = ({
  visible,
  title = 'Actie bevestigen',
  message = 'Weet u zeker dat u dit wilt verwijderen?',
  actionMessage = 'Verwijder',
  onClose,
  onConfirm
}) => (
  <Modal
    visible={visible}
    onClose={onClose}
    title={title}
    defaultStyle={{
      minWidth: '300px',
      transformOrigin: '0 0'
    }}
    actions={[
      {
        type: 'cancel',
        name: (
          <React.Fragment>
            <span>Annuleer</span>
          </React.Fragment>
        ),
        onClick: onClose
      },
      {
        type: 'danger',
        name: (
          <React.Fragment>
            <WarningIcon />
            <span>{actionMessage}</span>
          </React.Fragment>
        ),
        onClick: onConfirm
      }
    ]}
  >
    <p>{message}</p>
  </Modal>
);

export default Confirm;
