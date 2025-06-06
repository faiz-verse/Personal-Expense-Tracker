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
    const[budget, setBudget] = useState<budgetsModel[]>([
        {
            UUID: "userid",
            budgetUUID: "budgetid1",
            title: "Budget 1",
            emoji: "🍗",
            limit: 10000,
            categories: [
                "budget 1 category 1",
                "budget 1 category 2",
                "budget 1 category 3",
            ],
            description: "blah blah blah budget 1"
        },
        {
            UUID: "userid",
            budgetUUID: "budgetid2",
            title: "Budget 2",
            emoji: "🏍",
            limit: 10000,
            categories: [
                "budget 2 category 1",
                "budget 2 category 2",
                "budget 2 category 3",
            ],
            description: "blah blah blah budget 2"
        },
        {
            UUID: "userid",
            budgetUUID: "budgetid3",
            title: "Budget 3",
            emoji: "⛽",
            limit: 10000,
            categories: [
                "budget 3 category 1",
                "budget 3 category 2",
                "budget 3 category 3",
            ],
            description: "blah blah blah budget 3"
        }
    ]);

    // const handleAddBudget = (budget: budgetsModel, budgets: budgetsModel[], setBudget: React.Dispatch<React.SetStateAction<budgetsModel[]>>) => {
    //     if(budget){
    //         setBudget([... budgets, budget])
    //     }
    // }

    const[budgetEntries, setBudgetEntries] = useState<budgetEntry[]>([
        {
            entryUUID: "entryid",
            budgetUUID: "budgetid1",
            date: new Date(),
            category: "budget 1 category 1",
            title: "Expense 1",
            description: "blah blah blah expense 1",
            amount: 2000,
            paymentStatus: "paid"
        },
        {
            entryUUID: "entryid",
            budgetUUID: "budgetid3",
            date: new Date(),
            category: "budget 3 category 1",
            title: "Expense 2",
            description: "blah blah blah expense 2",
            amount: 2000,
            paymentStatus: "paid"
        },
        {
            entryUUID: "entryid",
            budgetUUID: "budgetid2",
            date: new Date(),
            category: "budget 2 category 2",
            title: "Expense 3",
            description: "blah blah blah expense 3",
            amount: 3000,
            paymentStatus: "paid"
        },
        {
            entryUUID: "entryid",
            budgetUUID: "budgetid1",
            date: new Date(),
            category: "budget 1 category 3",
            title: "Expense 4",
            description: "blah blah blah expense 4",
            amount: 1000,
            paymentStatus: "paid"
        }
    ]);

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
                    {budget.map((b, index) => {
                        return (
                            <div className='b-nav'>{b.title}</div>
                        )
                    })}
                </div>
                <div id='budget-content'>

                </div>
            </div>


        </div>
    )
}

export default Budgets