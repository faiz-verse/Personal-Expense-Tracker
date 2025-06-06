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
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
// Register required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// For Line chart (sample dataset)
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
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const
        },
        title: {
            display: true,
            text: 'Monthly Expenses',
            font: {
                size: 14,
                weight: 'bolder' as 'normal' | 'bold' | 'bolder' | 'lighter' | number // type cast
            },
            padding: {
                top: 10,
                bottom: 30
            }
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 500,  // 👈 Add this
                callback: function (value: number | string) {
                    return value; // Optional: format label
                }
            }
        }
    }
};

// For Pie Chart
const PieChartData = [
    { category: "Shopping", expense: 1000 },
    { category: "Chicken", expense: 3000 },
    { category: "Rent", expense: 2500 },
    { category: "Transport", expense: 1000 },
    { category: "Petrol", expense: 4000 },
    { category: "Education", expense: 5000 },
    { category: "Bike Maintainance", expense: 2000 },
]
const pieOptions = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Expenses Breakdown',
            font: {
                size: 14,
                weight: 'bolder' as 'normal' | 'bold' | 'bolder' | 'lighter' | number // type cast
            },
            padding: {
                top: 10,
                bottom: 30
            }
        },
        legend: {
            position: 'bottom' as const,
        }
    }
};



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
                <span>Analyse all of your spendings 📊</span>
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
                                <span>{label}</span>
                                <div className='bubble-helper'>{value}</div>
                            </div>
                        );
                    })
                ) : (
                    <p>No expenses yet</p>
                )}
            </div>

            <div id='reports-bottom'>
                {/* LINE CHART */}
                <div id='line-chart'>
                    <Line data={{
                        labels: expenses.map((data) => data.label),
                        datasets: [
                            {
                                label: "Expenses",
                                data: expenses.map((data) => data.expenses),
                                backgroundColor: 'cornflowerblue',
                                borderColor: 'cornflowerblue',
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
                    }} options={options} height={400} width={400}></Line>
                </div>
                {/* PIE CHART */}
                <div id='pie-chart'>
                    <Pie data={{
                        labels: PieChartData.map((data) => data.category),
                        datasets: [
                            {
                                label: "Expenses",
                                data: PieChartData.map((data) => data.expense),
                                backgroundColor: PieChartData.map(() => {
                                    const hue = Math.floor(Math.random() * 360); // any hue
                                    const saturation = 70 + Math.random() * 20; // 70–90%
                                    const lightness = 50 + Math.random() * 10;  // 80–90%
                                    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                                })
                            }
                        ],
                    }} options={pieOptions} height={400} width={400}></Pie>
                </div>
            </div>
        </div>
    );
};

export default Reports;
