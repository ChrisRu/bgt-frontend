import React, { Component } from "react";

class MenuButton extends Component {
  state = {
    open: false
  };

  toggle = () => {
    this.setState(
      ({ open }) => ({ open: !open }),
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.open);
        }
      }
    );
  };

  render() {
    const { open } = this.state;
    return (
      <div className={`menu-button ${open ? 'open' : ''}`}>
        <input type="checkbox" id="menu-button--inputbox" onChange={this.toggle} />
        <label className="menu-button--label" htmlFor="menu-button--inputbox">
          <div className="menu-button--bar" />
          <div className="menu-button--bar" />
          <div className="menu-button--bar" />
        </label>
      </div>
    );
  }
}

export default MenuButton;
