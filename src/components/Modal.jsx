import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  state = {
    fadeOut: false,
    fadeIn: true
  }

  close = () => {
    if (!this.props.onClose) {
      return;
    }

    this.setState({ fadeOut: true });

    setTimeout(() => {
      this.props.onClose();
    }, 600);
  }

  render() {
    const { fadeOut, fadeIn } = this.state;
    const { children, title } = this.props;

    return (
      <div className={`modal--wrapper ${fadeOut ? 'fade-out' : ''} ${fadeIn ? 'fade-in' : ''}`}>
        <div className="modal">
          <div className="modal--title">{title}</div>
          <div className="modal--close">
            <button onClick={this.close}>X</button>
          </div>
          <div className="modal--body">{children}</div>
        </div>
        <div className="modal--overlay" onClick={this.close} />
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default Modal;
