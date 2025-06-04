import React from 'react';
import { Bubble } from 'react-chartjs-2';

import './Reports.css';

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

const categories = [
    { "Shopping": 1000 },
    { "Chicken": 3000 },
    { "Rent": 2500 },
    { "Transport": 1000 },
    { "Petrol": 4000 },
    { "Education": 9000 },
    { "Bike Maintainance": 2000 },
]
const maxAmount = Math.max(...categories.map(obj => Object.values(obj)[0]));
const minSize = 40; // px
const maxSize = 150; // px
const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360); // any hue
    const saturation = 70 + Math.random() * 20; // 70–90%
    const lightness = 80 + Math.random() * 10;  // 80–90%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const data = {
    datasets: [
        {
            label: 'Spending Categories',
            data: [
                { x: 20, y: 20, r: 100, _customLabel: 'Shopping' },
                { x: 21, y: 21, r: 90, _customLabel: 'Dining' },
                { x: 22, y: 19, r: 80, _customLabel: 'Rent' },
                { x: 23, y: 22, r: 70, _customLabel: 'Transport' },
                { x: 24, y: 21, r: 60, _customLabel: 'Subscriptions' },
                { x: 25, y: 18, r: 50, _customLabel: 'Education' },
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
        <div id='reports'>
            <div id='title'>
                <span>Spendings Report</span>
                <span>Look at your spendings 👀</span>
            </div>

            <div style={{
                width: '100%',
                maxWidth: '500px',
                height: '250px',
                background: '#f9f9f9',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',

            }}>
                <Bubble data={data} options={options} />
            </div>

            <div id="bubble-chart" style={{
                display: 'flex'
            }}>
                {categories.length > 0 ? (
                    categories.map((cat, index) => {
                        const [label, value] = Object.entries(cat)[0];

                        // Normalize bubble size
                        const size = ((value / maxAmount) * (maxSize - minSize)) + minSize;
                        const color = getRandomColor();

                        return (
                            <div
                                className="bubble"
                                key={index}
                                style={{
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: color,
                                    color: '#fff',

                                }}
                            >
                                {label}
                            </div>
                        );
                    })
                ) : (
                    <p>No expenses yet</p>
                )}
            </div>


        </div>
    );
};

export default Reports;
