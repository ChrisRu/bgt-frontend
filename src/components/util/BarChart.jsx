import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-addons-css-transition-group';

class BarChart extends Component {
  state = {
    parsedData: []
  };

  get parsedData() {
    const { data, getter } = this.props;
    return data.map(getter || (x => x));
  }

  get max() {
    return Math.max(...this.parsedData);
  }

  get min() {
    return Math.min(...this.parsedData);
  }

  render() {
    const { className, color } = this.props;

    return (
      <div className={`bar-chart ${className || ''}`}>
        <TransitionGroup
          transitionName="bar-animation"
          transitionAppear
          transitionEnter
          transitionLeave
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {this.parsedData.map(item => (
            <div key={item} className="bar-chart--bar" style={{ height: `${item / this.max * 100}%`, backgroundColor: color }} />
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  getter: PropTypes.func
};

export default BarChart;
