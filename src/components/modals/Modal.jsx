import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import classnames from 'classnames';

import { CrossIcon } from '../util/static/icons';
import Show from '../util/Show';

const duration = 400;

const defaultStyle = {
  transition: `transform ${duration}ms ease, opacity ${duration}ms ease`
};

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
    transform: 'scale(0) translate(0, 0)'
  }
};

const ActionButton = ({ type, onClick, name, callChild, align }) => (
  <button
    className={classnames('button', `button--${type}`, 'modal--button', {
      'modal--button-left': align === 'left'
    })}
    onClick={typeof onClick === 'string' ? callChild(onClick) : onClick}
  >
    {name}
  </button>
);

class Modal extends Component {
  callChild = methodName => {
    if (this.child) {
      return this.child[methodName].bind(this.child);
    }
  };

  render() {
    const { children, render, title, onClose, visible, actions } = this.props;

    return (
      <div className="modal--wrapper">
        <Transition
          in={visible}
          timeout={0}
          onEntered={() => {
            if (this.modal.offsetHeight % 2 !== 0) {
              this.modal.style.minHeight = this.modal.offsetHeight + 1 + 'px';
            }

            if (this.modal.offsetWidth % 2 !== 0) {
              this.modal.style.minWidth = this.modal.offsetWidth + 1 + 'px';
            }
          }}
        >
          {state => (
            <div
              style={{
                ...defaultStyle,
                ...this.props.defaultStyle,
                ...(this.props.transitionStyles
                  ? this.props.transitionStyles[state]
                  : transitionStyles[state])
              }}
              className="modal"
              ref={modal => {
                this.modal = modal;
              }}
            >
              <h2 className="modal--title">{title}</h2>
              <div className="modal--close">
                <CrossIcon onClick={onClose} />
              </div>
              <div className="modal--body">
                {!children
                  ? render(child => {
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
                        key={props.type}
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
          className={classnames('modal--overlay', { visible })}
          onClick={onClose}
        />
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  render: PropTypes.func
};

export default Modal;
