import React, { Component } from 'react';

import Form from '../../../../../forms/Form';

import { CrossIcon, SaveIcon } from '../../../../../util/static/icons';

class EditCategory extends Component {
  state = {
    data: {},
    hadValue: false
  };

  componentDidMount() {
    const { data, projectId } = this.props;

    this.setState({ hadValue: !!data, data: { ...data, projectId } });
  }

  onChange = newData => {
    this.setState({ data: { ...this.state.data, ...newData } });
  };

  submit = () => {
    const { data, hadValue } = this.state;

    this.props.onSubmit(data, hadValue);
  };

  render() {
    const { name, form, onClose } = this.props;
    const { data } = this.state;

    return (
      <div>
        <span className="category__name">{name}</span>
        <button
          className="button button--cancel button--icon-only pull-right"
          type="submit"
          onClick={onClose}
        >
          <CrossIcon />
        </button>
        <Form form={form} data={data} onChange={this.onChange} />
        <div className="category__buttons">
          <button
            className="button button--confirm"
            type="submit"
            onClick={this.submit}
          >
            <SaveIcon />
            Opslaan
          </button>
        </div>
      </div>
    );
  }
}

export default EditCategory;
