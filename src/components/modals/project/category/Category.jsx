import React, { Component } from 'react';
import classnames from 'classnames';

import ClosedCategory from './components/ClosedCategory';
import EditCategory from './components/EditCategory';
import OpenCategory from './components/OpenCategory';

class Category extends Component {
  state = {
    done: false,
    open: false,
    edit: false
  };

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState({
      done: props.data
    });
  }

  open = () => {
    this.setState({ open: true });
  };

  edit = () => {
    this.setState({ edit: true });
  };

  submit = () => {
    this.setState({ open: false, edit: false });
  };

  render() {
    const { name } = this.props;
    const { done, open, edit } = this.state;

    return (
      <div
        className={classnames('category', {
          'category--done': done,
          'category--open': open,
          'category--edit': edit
        })}
        onClick={() => this.setState({ open: true })}
      >
        {open ? (
          edit ? (
            <EditCategory name={name} onSubmit={this.submit} />
          ) : (
            <OpenCategory name={name} done={done} onEdit={this.edit} />
          )
        ) : (
          <ClosedCategory name={name} done={done} onOpen={this.open} />
        )}
      </div>
    );
  }
}

export default Category;
