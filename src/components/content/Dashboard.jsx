import React, { Component } from 'react';
import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';
import ReactTable from 'react-table';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import Cell from 'recharts/lib/component/Cell';
import { getColor } from './map/Marker';

import HTTP from '../util/services/http';

class Dashboard extends Component {
  state = {
    COLORS: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    tableSettings: {
      previousText: 'Vorige',
      nextText: 'Volgende',
      loadingText: 'Laden...',
      noDataText: 'Geen data gevonden',
      pageText: 'Pagina',
      ofText: 'van',
      rowsText: 'rijen'
    },
    data: null
  };

  async getStats() {
    this.setState({ data: await HTTP.stats.get() });
  }

  getMeasurementTypes() {
    const { data } = this.state;
    return data
      ? data.measurementTypes.map(({ amount, category }) => ({
          amount: amount || 0,
          category: category || 'Anders'
        }))
      : [];
  }

  componentWillMount() {
    return this.getStats();
  }

  getDeadline(date) {
    const deadline = new Date(date.valueOf());
    deadline.setDate(deadline.getDate() + 30 * 6);
    return deadline.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getHighPriorityCount(projects) {
    return (projects || []).filter(project => {
      const deadline = new Date(project.exploreDate);
      deadline.setDate(deadline.getDate() + 30 * 5);
      return new Date() > deadline;
    }).length;
  }

  render() {
    const { COLORS, data, tableSettings } = this.state;
    const { onOpenPopup } = this.props;

    return (
      <div className="dashboard">
        <div className="dashboard__item dashboard__item--priorities">
          <h2 className="dashboard__title">Deadlines</h2>
          {data ? (
            <ReactTable
              columns={[
                {
                  Header: 'BGT Nummer',
                  accessor: 'bgtOnNumber'
                },
                {
                  Header: 'Deadline',
                  accessor: 'exploreDate',
                  Cell: ({ value }) => (
                    <span className={`status status--${getColor(value)}`}>
                      {this.getDeadline(value)}
                    </span>
                  )
                }
              ]}
              data={(data.priorities || []).slice(-5)}
              getTdProps={(state, rowInfo, column, instance) => ({
                onClick: () => onOpenPopup(rowInfo ? rowInfo.original.id : null)
              })}
              showPagination={false}
              defaultPageSize={(data.priorities || []).length || 3}
              {...tableSettings}
            />
          ) : null}
        </div>
        <div className="dashboard__block">
          <div className="dashboard__item dashboard__item--stats">
            <h2 className="dashboard__title">Projecten</h2>
            {data ? (
              <div className="dashboard__numbers">
                <div
                  className="dashboard__number"
                  style={{ borderColor: COLORS[0] }}
                >
                  <span className="dashboard__number-value">
                    {(data.projectsCount || {}).openAmount || 0}
                  </span>
                  <span className="dashboard__number-title">Open</span>
                </div>
                <div
                  className="dashboard__number"
                  style={{ borderColor: COLORS[3] }}
                >
                  <span className="dashboard__number-value">
                    {this.getHighPriorityCount(data.priorities)}
                  </span>
                  <span className="dashboard__number-title">
                    Hoge prioriteit
                  </span>
                </div>
              </div>
            ) : null}
          </div>
          <div className="dashboard__item dashboard__item-pie">
            <h2 className="dashboard__title">Type metingen</h2>
            <PieChart width={322} height={180}>
              <Pie
                data={this.getMeasurementTypes()}
                dataKey="amount"
                nameKey="category"
                outerRadius={70}
              >
                {this.getMeasurementTypes().map((entry, index) => (
                  <Cell key={entry} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend align="right" verticalAlign="middle" layout="vertical" />
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
