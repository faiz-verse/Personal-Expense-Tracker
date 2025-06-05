import React, { useState } from 'react'
import { IconBaseProps } from "react-icons";
import { BsChevronLeft, BsChevronRight, BsPlusLg } from "react-icons/bs";

import './Budgets.css'

import AddBudgetModal from '../components/AddBudgetModal';

interface budgetsModel {
    title: string,
    emoji: string,
    limit: number,
    status?: string,
    categories: string[],
    description: string
}

interface budgetEntry {
    date: Date,
    category: string,
    title: string,
    description: string,
    amount: number,
    status: string
}

const Budgets = () => {

    const LeftArrow = BsChevronLeft as React.ComponentType<IconBaseProps>;
    const RightArrow = BsChevronRight as React.ComponentType<IconBaseProps>;
    const PlusIcon = BsPlusLg as React.ComponentType<IconBaseProps>;
    // For month change
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const handlePrev = () => {
        const prevMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() - 1));
        setCurrentMonth(new Date(prevMonth));
    };
    const handleNext = () => {
        const nextMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
        setCurrentMonth(new Date(nextMonth));
    };

    // FOR BUDGET
    const[budget, setBudget] = useState<budgetsModel[]>([])
    const[budgetEntries, setBudgetEntries] = useState<budgetEntry[]>([])

    const [isModalActive, setIsModalActive] = useState<boolean>(false);

    // Budgets
    const budgets = [
        {
            title: "Budget 1",
            emoji: "🍗",
            limit: 10000,
            status: "on track",
            categories: [
                "category 1",
                "category 2",
                "category 3",
            ],
        }
    ]

    return (
        <div id='budgets'>
            <div id='title'>
                <span>Budgets</span>
                <span>Track your finances and achieve your financial goals 🎯</span>
            </div>

            <div id='container-buttons'>
                <div id='container-month'>
                    <button id='prev' onClick={handlePrev}><LeftArrow size={16} color='4d69ff' strokeWidth={1} /></button>
                    <span>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                    <button id='next' onClick={handleNext}><RightArrow size={16} color='4d69ff' strokeWidth={1} /></button>
                </div>
                <button id='add-budget' onClick={()=>{setIsModalActive(!isModalActive)}}><PlusIcon size={18} color="#4d69ff" strokeWidth={1} />New Budget</button>
                <button id='add-expense'><PlusIcon size={18} color="#4d69ff" strokeWidth={1} />New Expense</button>
            </div>

            {/* add budget modal */}
            {!!isModalActive && <AddBudgetModal isModalActive={isModalActive} setIsModalActive={setIsModalActive} />}

        </div>
    )
}

export default Budgets