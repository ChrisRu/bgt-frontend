import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { CrossIcon } from '../../util/icons';

const duration = 400;

const defaultStyle = {
  transition: `transform ${duration}ms ease`,
  opacity: 0,
  pointerEvents: 'none',
  transformOrigin: '90% 90%',
  transform: 'scale(0.01) translate(90%, 90%)'
};

const transitionStyles = {
  entering: {
    opacity: 0,
    pointerEvents: 'all',
    transform: 'scale(0.01) translate(90%, 90%)'
  },
  entered: {
    opacity: 1,
    pointerEvents: 'all',
    transform: 'scale(1) translate(0, 0)'
  }
};

class Modal extends Component {
  render() {
    const { children, title, onClose, visible, actions } = this.props;

    return (
      <div className="modal--wrapper">
        <Transition in={visible} timeout={0}>
          {state => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
              className="modal">
              <h2 className="modal--title">{title}</h2>
              <div className="modal--close">
                <CrossIcon onClick={onClose} />
              </div>
              <div className="modal--body">{children}</div>

              <div className="modal--footer">
                {actions.map(({ type, onClick, name }) => (
                  <button
                    className={`button button--${type} modal--button`}
                    onClick={onClick}>
                    {name}
                  </button>
                ))}
              </div>
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
