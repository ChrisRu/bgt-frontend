import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: '',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  animation: {
    duration: 700
  }
};

const Dashboard = () => (
  <div className="dashboard">
    <div className="dashboard--item">
      <h2>Jaar Rapport</h2>
      <div className="dashboard--item-month">
        <Bar
          data={data}
          width={100}
          height={50}
          options={options}
        />
      </div>
    </div>
  </div>
);

export default Dashboard;
