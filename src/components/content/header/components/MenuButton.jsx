import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class MenuButton extends Component {
  state = {
    open: false
  };

  toggle = () => {
    this.setState(
      ({ open }) => ({ open: !open }),
      () => {
        this.props.onChange(this.state.open);
      }
    );
  };

  render() {
    const { open } = this.state;
    return (
      <div className={classnames('menu-button', { open })}>
        <input
          type="checkbox"
          id="menu-button__inputbox"
          onChange={this.toggle}
        />
        <label
          className="menu-button__label"
          htmlFor="menu-button__inputbox"
          title={open ? 'Sluit menu' : 'Open menu'}
        >
          <div className="menu-button__bar" />
          <div className="menu-button__bar" />
          <div className="menu-button__bar" />
        </label>
      </div>
    );
  }
}

MenuButton.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default MenuButton;
