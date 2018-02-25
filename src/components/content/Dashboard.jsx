import React from 'react';
import BarChart from '../util/BarChart';

const Dashboard = () => (
  <div className="dashboard">
    <div className="dashboard--item">
      <h2>Jaar Rapport</h2>
      <div className="dashboard--item-month">
        <BarChart
          color="#f9c2E8"
          data={[{x: 1}, {x: 6}, {x: 3}]}
          getter={x => x.x}
        />
      </div>
    </div>
  </div>
);

export default Dashboard;
