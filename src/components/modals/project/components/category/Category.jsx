import React, { Component } from 'react';
import classnames from 'classnames';

import ClosedCategory from './components/ClosedCategory';
import EditCategory from './components/EditCategory';
import OpenCategory from './components/OpenCategory';

class Category extends Component {
  state = {
    isEditing: false
  };

  open = () => {
    this.props.onOpen();
  };

  edit = event => {
    event.stopPropagation();
    this.setState({ isEditing: true });
  };

  close = event => {
    this.props.onClose();
    this.setState({ isEditing: false });
  };

  submit = (...args) => {
    this.props.submit(...args);
    this.close();
  };

  render() {
    const { name = '', form = {}, data, done, open, projectId } = this.props;
    const { isEditing } = this.state;

    const isDone = done(data || {});

    return (
      <div
        className={classnames('category', {
          'category--done': isDone,
          'category--open': open,
          'category--edit': isEditing
        })}
      >
        {open ? (
          isEditing ? (
            <EditCategory
              name={name}
              data={data}
              form={form}
              projectId={projectId}
              onSubmit={this.submit}
              onClose={this.close}
            />
          ) : (
            <OpenCategory
              name={name}
              data={data || {}}
              form={form}
              done={isDone}
              onEdit={this.edit}
              onClose={this.close}
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
