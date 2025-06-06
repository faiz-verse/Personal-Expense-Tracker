import React, { useState } from 'react'
import { IconBaseProps } from "react-icons";
import { BsChevronLeft, BsChevronRight, BsPlusLg } from "react-icons/bs";

import './Budgets.css'

import AddBudgetModal from '../components/AddBudgetModal';
import AddExpenseModal from '../components/AddExpenseModal';

interface budgetsModel {
    UUID: string,
    budgetUUID: string,
    title: string,
    emoji: string,
    limit: number,
    categories: string[],
    description: string
}

interface budgetEntry {
    entryUUID: string,
    budgetUUID: string,
    date: Date,
    category: string,
    title: string,
    description: string,
    amount: number,
    paymentStatus: string
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

    // const handleAddBudget = (budget: budgetsModel, budgets: budgetsModel[], setBudget: React.Dispatch<React.SetStateAction<budgetsModel[]>>) => {
    //     if(budget){
    //         setBudget([... budgets, budget])
    //     }
    // }

    const[budgetEntries, setBudgetEntries] = useState<budgetEntry[]>([])

    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [isExpModalActive, setIsExpModalActive] = useState<boolean>(false);

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
                <button id='add-expense' onClick={()=>{setIsExpModalActive(!isExpModalActive)}}><PlusIcon size={18} color="#4d69ff" strokeWidth={1} />New Expense</button>
            </div>

            {/* add budget modal */}
            {!!isModalActive && <AddBudgetModal isModalActive={isModalActive} setIsModalActive={setIsModalActive} />}
            {!!isExpModalActive && <AddExpenseModal isModalActive={isExpModalActive} setIsModalActive={setIsExpModalActive} />}

            <div id='budget-container'>
                <div id='budgets-nav'>
                    
                </div>
            </div>


        </div>
    )
}

export default Budgets