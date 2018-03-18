import React from 'react';
import Modal from '../util/Modal';

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

const MapPopup = ({ bgtOnNumber, visible, status, description, onClose }) => (
  <Modal
    visible={visible}
    onClose={onClose}
    title={`Project ${bgtOnNumber}`}
    defaultStyle={{ transformOrigin: '0 0' }}
    transitionStyles={transitionStyles}
  >
    <div className="modal--popup">
      <h3>{bgtOnNumber}</h3>
      <p>{status}</p>
      <p>{description}</p>
    </div>
  </Modal>
);

export default MapPopup;
