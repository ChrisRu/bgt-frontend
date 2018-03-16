import React from 'react';
import Modal from '../util/Modal';

const MapPopup = ({ bgtOnNumber, status, description, onClose }) => (
  <Modal visible={true} onClose={onClose} title={`Project ${bgtOnNumber}`}>
    <h3>{bgtOnNumber}</h3>
    <p>{status}</p>
    <p>{description}</p>
  </Modal>
);

export default MapPopup;
