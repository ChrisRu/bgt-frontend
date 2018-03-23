import React, { Component } from 'react';
import classnames from 'classnames';
import { CheckIcon } from '../../util/icons';

class Category extends Component {
  state = {
    done: false,
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

  submit = () => {
    this.setState({ edit: false });

    // TODO: submit here
  };

  render() {
    const { name } = this.props;
    const { done, edit } = this.state;

    return (
      <div
        className={classnames('category', {
          'category--done': done,
          'category--edit': edit
        })}
        onClick={() => this.setState({ edit: true })}
      >
        {edit ? (
          <React.Fragment>
            <span className="category__name">{name}</span>
            <input type="text" className="input" />
            <input type="text" className="input" />
            <button
              className="button button--confirm"
              type="submit"
              onClick={this.submit}
            >
              Opslaan
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span className="category__name">{name}</span>
            <div className={classnames('category__icon', { hidden: !done })}>
              <CheckIcon />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Category;
