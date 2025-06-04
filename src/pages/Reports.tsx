import React from 'react';
import { Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
  Title,
} from 'chart.js';

ChartJS.register(Tooltip, Legend, PointElement, LinearScale, Title);

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const { raw } = context;
          return `${raw._customLabel}: ₹${raw.r * 100}`;
        },
      },
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
};

const data = {
  datasets: [
    {
      label: 'Spending Categories',
      data: [
        { x: 18, y: 20, r: 150, _customLabel: 'Shopping' },
        { x: 19, y: 21, r: 140, _customLabel: 'Dining' },
        { x: 20, y: 19, r: 130, _customLabel: 'Rent' },
        { x: 21, y: 22, r: 120, _customLabel: 'Transport' },
        { x: 22, y: 21, r: 110, _customLabel: 'Subscriptions' },
        { x: 23, y: 18, r: 100, _customLabel: 'Education' },
      ],
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ],
      borderColor: '#fff',
      borderWidth: 1,
    },
  ],
};

const Reports = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>Spending Report</h2>
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        height: '500px',
        margin: '0 auto',
        background: '#f9f9f9',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      }}>
        <Bubble data={data} options={options} />
      </div>
    </div>
  );
};

export default Reports;
