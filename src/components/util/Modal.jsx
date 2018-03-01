import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { CrossIcon } from '../../util/icons';

const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
  opacity: 0,
  pointerEvents: 'none',
  transform: 'scale(0)'
};

const transitionStyles = {
  entering: {
    opacity: 0,
    pointerEvents: 'all',
    transform: 'scale(0)'
  },
  entered: {
    opacity: 1,
    pointerEvents: 'all',
    transform: 'scale(1)'
  }
};

class Modal extends Component {
  render() {
    const { children, title, onClose, visible } = this.props;

    return (
      <div className="modal--wrapper">
        <Transition in={visible} timeout={duration}>
          {state => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
              className="modal">
              <div className="modal--title">{title}</div>
              <div className="modal--close">
                <CrossIcon onClick={onClose} />
              </div>
              <div className="modal--body">{children}</div>
            </div>
          )}
        </Transition>
        <div
          className={`modal--overlay ${visible ? 'visible' : ''}`}
          onClick={onClose}
        />
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
