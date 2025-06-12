import React, { useState } from 'react';

import { IconBaseProps } from "react-icons";
import { BsArrowClockwise } from 'react-icons/bs';

import './Reports.css';

// For Line And Pie Chart
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

// Interface for the budgetEntries
interface budgetEntry {
    entryUUID: string,
    budgetUUID: string,
    date: number,
    category: string,
    title: string,
    description: string,
    amount: number,
    paymentStatus: string
}

// FOR GETTING BUDGET
const storedEntries = localStorage.getItem("budgetEntries");
const storedBalances = localStorage.getItem("monthlyBalances");
const budgetEntries: budgetEntry[] = storedEntries ? JSON.parse(storedEntries) : [];

// For Line chart (converting to required structure)
const monthlyBalances: { month: number; year: number; balance: number }[] = storedBalances ? JSON.parse(storedBalances) : [];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// function to convert the budgetEntries to the required structured dataset
const buildMonthlyExpenseData = (

    entries: budgetEntry[],
    balances: { month: number; year: number; balance: number }[]
) => {
    const result = Array.from({ length: 12 }, (_, i) => ({
        label: monthNames[i],
        expenses: 0,
        savings: 0,
    }));

    // Add up expenses for each month
    entries.forEach((entry) => {
        if (entry.paymentStatus.toLowerCase() !== "paid") return;

        const date = new Date(entry.date);
        const month = date.getMonth();
        result[month].expenses += entry.amount;
    });

    // Add savings per month using monthlyBalances
    balances.forEach(({ month, balance }) => {
        const expensesForMonth = result[month].expenses;
        result[month].savings = Math.max(balance - expensesForMonth, 0);
    });

    return result;
};
const expenses = buildMonthlyExpenseData(budgetEntries, monthlyBalances);
// console.log(expensesData); // 🎯 Final data ready for chart!
// options for the line graph
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
// function to convert the budgetEntries to the required structured dataset
const buildPieChartData = (entries: budgetEntry[]) => {
    const categoryMap: { [category: string]: number } = {};

    entries.forEach((entry) => {
        if (entry.paymentStatus.toLowerCase() !== "paid") return;

        const cat = entry.category.trim();
        if (categoryMap[cat]) {
            categoryMap[cat] += entry.amount;
        } else {
            categoryMap[cat] = entry.amount;
        }
    });

    const pieData = Object.entries(categoryMap).map(([category, expense]) => ({
        category,
        expense,
    }));

    return pieData;
};
const PieChartData = buildPieChartData(budgetEntries);
// console.log(PieChartData); // 🥧 Final pie data ready
// options for the pie chart
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
// function to convert the budgetEntries to the required structured dataset
const buildBubbleChartData = (entries: budgetEntry[]) => {
    const categoryMap: { [category: string]: number } = {};

    entries.forEach((entry) => {
        if (entry.paymentStatus.toLowerCase() !== "paid") return;

        const cat = entry.category.trim();
        if (categoryMap[cat]) {
            categoryMap[cat] += entry.amount;
        } else {
            categoryMap[cat] = entry.amount;
        }
    });

    const bubbleData = Object.entries(categoryMap).map(([category, amount]) => ({
        [category]: amount,
    }));

    return bubbleData;
};
const categories = buildBubbleChartData(budgetEntries);

// for generating random pastel/light colors 
const maxAmount = Math.max(...categories.map(obj => Object.values(obj)[0]));
const minSize = 60; // px
const maxSize = 200; // px
// function to generate random color based on HSL
const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360); // any hue
    const saturation = 70 + Math.random() * 20; // 70–90%
    const lightness = 50 + Math.random() * 10;  // 80–90%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};


const Reports = () => {

    const RefreshIcon = BsArrowClockwise as React.ComponentType<IconBaseProps>;

    // For bubble hover
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const handleMouseEnter = (index: number) => setHoveredIndex(index);
    const handleMouseLeave = () => setHoveredIndex(null);

    return (
        <div id='reports'>

            <button id="refresh-btn" onClick={()=>{
                        window.location.reload();
                }}><RefreshIcon size={16} color='#4d69ff'/>Refresh</button>

            <div id='title'>
                <span>Spendings Report</span>
                <span>Analyse all of your spendings 📊</span>
            </div>

            {/* CUSTOM BUBBLE CHART */}
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
