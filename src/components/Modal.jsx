import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-addons-css-transition-group';
import { CrossIcon } from '../util/icons';

class Modal extends Component {
  render() {
    const { children, title, onClose, visible } = this.props;

    return (
      <div className="modal--wrapper">
        <TransitionGroup
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
                <CrossIcon onClick={onClose} />
              </div>
              <div className="modal--body">{children}</div>
            </div>
          ) : null}
        </TransitionGroup>
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
