import React, { Component } from 'react';
import classnames from 'classnames';

import ClosedCategory from './components/ClosedCategory';
import EditCategory from './components/EditCategory';
import OpenCategory from './components/OpenCategory';

class Category extends Component {
  state = {
    isOpen: false,
    isEditing: false
  };

  open = () => {
    this.setState({ isOpen: true });
  };

  edit = () => {
    this.setState({ isEditing: true });
  };

  close = event => {
    event.preventDefault();
    this.setState({ isEditing: false, isOpen: false });
  };

  submit = (...args) => {
    this.props.submit(...args);
    this.close();
  };

  render() {
    const { name = '', form = {}, data = {}, done } = this.props;
    const { isOpen, isEditing } = this.state;

    const isDone = done(data);

    console.log(isOpen, isEditing, isDone);

    return (
      <div
        className={classnames('category', {
          'category--done': isDone,
          'category--open': isOpen,
          'category--edit': isEditing
        })}
      >
        {isOpen ? (
          isEditing ? (
            <EditCategory
              name={name}
              data={data}
              form={form}
              onSubmit={this.submit}
              onClose={this.close}
            />
          ) : (
            <OpenCategory
              name={name}
              data={data}
              form={form}
              done={isDone}
              onEdit={this.edit}
            />
          )
        ) : (
          <ClosedCategory name={name} done={isDone} onOpen={this.open} />
        )}
      </div>
    );
  }
}

export default Category;
