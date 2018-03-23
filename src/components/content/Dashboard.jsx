import React, { Component } from 'react';

import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';
import AreaChart from 'recharts/lib/chart/AreaChart';
import Area from 'recharts/lib/cartesian/Area';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import Cell from 'recharts/lib/component/Cell';

class Dashboard extends Component {
  state = {
    COLORS: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    pieData: [
      { type: 'Nieuwbouw', value: 20 },
      { type: 'Wijkmap', value: 8 },
      { type: 'BAG', value: 2 },
      { type: 'Anders', value: 4 }
    ]
  };

  render() {
    const { COLORS, pieData } = this.state;

    return (
      <div className="dashboard">
        <div className="dashboard__item dashboard__item--rapport">
          <h2 className="dashboard__title">Jaar Rapport</h2>
          <AreaChart
            width={800}
            height={440}
            data={[
              { x: 100, name: 'Januari' },
              { x: 621, name: 'Februari' },
              { x: 340, name: 'Maart' }
            ]}
            margin={{ top: 20, right: 20 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="x"
              stroke={COLORS[1]}
              fill={COLORS[1]}
            />
          </AreaChart>
        </div>
        <div className="dashboard__block">
          <div className="dashboard__item dashboard__item--stats">
            <h2 className="dashboard__title">Statistieken</h2>
            <div className="dashboard__numbers">
              <div
                className="dashboard__number"
                style={{ borderColor: COLORS[0] }}
              >
                <span className="dashboard__number-value">34</span>
                <span className="dashboard__number-title">Open taken</span>
              </div>
              <div
                className="dashboard__number"
                style={{ borderColor: COLORS[3] }}
              >
                <span className="dashboard__number-value">7</span>
                <span className="dashboard__number-title">
                  Hoge prioriteit taken
                </span>
              </div>
            </div>
          </div>
          <div className="dashboard__item dashboard__item-pie">
            <h2 className="dashboard__title">Type metingen</h2>
            <PieChart width={322} height={180}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="type"
                cx={80}
                cy="50%"
                outerRadius={80}
              >
                {pieData.map((entry, index) => (
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
