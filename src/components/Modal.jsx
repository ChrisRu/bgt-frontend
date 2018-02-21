import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Modal extends Component {
  render() {
    const { children, title, onClose, visible } = this.props;

    return (
      <div className="modal--wrapper">
        <ReactCSSTransitionGroup
          transitionName="modal-animation"
          transitionAppear
          transitionEnter
          transitionLeave
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {visible ? (
            <div className="modal">
              <div className="modal--title">{title}</div>
              <div className="modal--close">
                <button onClick={onClose}>X</button>
              </div>
              <div className="modal--body">{children}</div>
            </div>
          ) : null}
        </ReactCSSTransitionGroup>
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
