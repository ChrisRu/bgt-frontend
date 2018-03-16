import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { CrossIcon } from '../../util/icons';

const duration = 400;

const defaultStyle = {
  transition: `transform ${duration}ms ease`,
  opacity: 0,
  pointerEvents: 'none',
  transformOrigin: '100vw 100vh',
  transform: 'scale(0.01) translate(0, 0)'
};

const transitionStyles = {
  entering: {
    opacity: 0,
    pointerEvents: 'all',
    transform: 'scale(0.01) translate(0, 0)'
  },
  entered: {
    opacity: 1,
    pointerEvents: 'all',
    transform: 'scale(1) translate(-50%, -50%)'
  },
  exiting: {
    opacity: 1,
    pointerEvents: 'all',
    transform: 'scale(1) translate(-50%, -50%)'
  },
  exited: {
    opacity: 0,
    pointerEvents: 'all',
    transform: 'scale(0.01) translate(0, 0)'
  }
};

class Modal extends Component {
  callChild = methodName => {
    if (this.child) {
      return this.child[methodName];
    }
  };

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
              className="modal"
            >
              <h2 className="modal--title">{title}</h2>
              <div className="modal--close">
                <CrossIcon onClick={onClose} />
              </div>
              <div className="modal--body">
                {children(child => {
                  this.child = child;
                })}
              </div>

              <div className="modal--footer">
                {actions.map(({ type, onClick, name }) => (
                  <button
                    key={name}
                    className={`button button--${type} modal--button`}
                    onClick={
                      typeof onClick === 'string'
                        ? this.callChild(onClick)
                        : onClick
                    }
                  >
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
  children: PropTypes.func.isRequired
};

export default Modal;
