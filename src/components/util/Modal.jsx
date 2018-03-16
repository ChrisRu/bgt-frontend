import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { CrossIcon } from '../../util/icons';
import Show from '../util/Show';

const duration = 400;

const defaultStyle = {
  transition: `transform ${duration}ms ease, opacity ${duration}ms ease`,
  opacity: 0,
  pointerEvents: 'none',
  transformOrigin: '100vw 100vh',
  transform: 'scale(0) translate(0, 0)'
};

const transitionStyles = {
  entered: {
    opacity: 1,
    pointerEvents: 'all',
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
    pointerEvents: 'none',
    transform: 'scale(0) translate(0, 0)'
  }
};

const ActionButton = ({ type, onClick, name, callChild }) => (
  <button
    className={`button button--${type} modal--button`}
    onClick={typeof onClick === 'string' ? callChild(onClick) : onClick}
  >
    {name}
  </button>
);

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
                {typeof children === 'function'
                  ? children(child => {
                      this.child = child;
                    })
                  : children}
              </div>

              <Show
                visible={actions}
                render={() => (
                  <div className="modal--footer">
                    {actions.map(props => (
                      <ActionButton
                        {...props}
                        key={props.name}
                        callChild={this.callChild}
                      />
                    ))}
                  </div>
                )}
              />
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
