import React from 'react';

import Modal from './Modal';
import { WarningIcon } from '../util/static/icons';

const Confirm = ({
  visible,
  title = 'Actie bevestigen',
  message = 'Weet u zeker dat u dit wilt verwijderen?',
  onClose,
  onConfirm
}) => (
  <Modal
    visible={visible}
    onClose={onClose}
    title={title}
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
        type: 'warning',
        name: (
          <React.Fragment>
            <WarningIcon />
            <span>Confirm</span>
          </React.Fragment>
        ),
        onClick: onConfirm
      }
    ]}
    defaultStyle={{ transformOrigin: '0 0' }}
  >
    {message}
  </Modal>
);

export default Confirm;
