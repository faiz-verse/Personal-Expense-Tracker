import React, { useState } from 'react';

import './Reports.css';

// For Line Chart
// Import this block in your Reports.tsx
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// Register required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const  // 👈 FIX here
        },
        title: {
            display: true,
            text: 'Monthly Expenses'
        },
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

// For Line chart
const expenses = [
    { label: "Jan", expenses: 8880, savings: 1000 },
    { label: "Feb", expenses: 7920, savings: 1500 },
    { label: "Mar", expenses: 9300, savings: 1200 },
    { label: "Apr", expenses: 8500, savings: 1600 },
    { label: "May", expenses: 9100, savings: 1800 },
    { label: "Jun", expenses: 8700, savings: 1400 },
    { label: "Jul", expenses: 9400, savings: 1300 },
    { label: "Aug", expenses: 8900, savings: 1700 },
    { label: "Sep", expenses: 9100, savings: 1500 },
    { label: "Oct", expenses: 8800, savings: 2000 },
    { label: "Nov", expenses: 9200, savings: 1900 },
    { label: "Dec", expenses: 9500, savings: 2100 },
];

// For bubble chart
const categories = [
    { "Shopping": 1000 },
    { "Chicken": 3000 },
    { "Rent": 2500 },
    { "Transport": 1000 },
    { "Petrol": 4000 },
    { "Education": 5000 },
    { "Bike Maintainance": 2000 },
]
const maxAmount = Math.max(...categories.map(obj => Object.values(obj)[0]));
const minSize = 60; // px
const maxSize = 200; // px
const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360); // any hue
    const saturation = 70 + Math.random() * 20; // 70–90%
    const lightness = 50 + Math.random() * 10;  // 80–90%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const Reports = () => {

    // For bubble hover
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const handleMouseEnter = (index: number) => setHoveredIndex(index);
    const handleMouseLeave = () => setHoveredIndex(null);

    return (
        <div id='reports'>
            <div id='title'>
                <span>Spendings Report</span>
                <span>Look at your spendings 👀</span>
            </div>

            <div id="bubble-chart">
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
                                    backgroundColor: color,
                                    boxShadow: hoveredIndex === index ? `0 0 20px ${color}` : `0 0 10px ${color}`,
                                    margin: `-${10 + Math.random() * 20}px`,
                                    transform: `translateY(${-50 + Math.random() * 80}px)`,
                                    zIndex: hoveredIndex === index ? '100' : `${index}`,
                                    opacity: hoveredIndex === index ? '1' : '0.5',
                                    scale: hoveredIndex === index ? '1.2' : '1',
                                }}

                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {label}
                            </div>
                        );
                    })
                ) : (
                    <p>No expenses yet</p>
                )}
            </div>

            <div id='line-chart' style={{ maxWidth: '900px', margin: '50px auto' }}>
                <Line data={{
                    labels: expenses.map((data) => data.label),
                    datasets: [
                        {
                            label: "Expenses",
                            data: expenses.map((data) => data.expenses),
                            backgroundColor: 'blue',
                            borderColor: 'blue',
                            borderWidth: 2,
                            tension: 0.4,
                            fill: false
                        },
                        {
                            label: "Savings",
                            data: expenses.map((data) => data.savings),
                            backgroundColor: 'palegreen',
                            borderColor: 'palegreen',
                            borderWidth: 2,
                            tension: 0.4,
                            fill: false
                        }
                    ],
                }} options={options} ></Line>
            </div>

        </div>
    );
};

export default Reports;
