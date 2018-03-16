import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div className={`menu-button ${open ? 'open' : ''}`}>
        <input
          type="checkbox"
          id="menu-button--inputbox"
          onChange={this.toggle}
        />
        <label
          className="menu-button--label"
          htmlFor="menu-button--inputbox"
          title={open ? 'Sluit menu' : 'Open menu'}
        >
          <div className="menu-button--bar" />
          <div className="menu-button--bar" />
          <div className="menu-button--bar" />
        </label>
      </div>
    );
  }
}

MenuButton.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default MenuButton;
