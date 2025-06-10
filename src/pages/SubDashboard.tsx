import React, { useState, useEffect } from 'react';

import { IconBaseProps } from "react-icons";
import { BsPlusLg } from "react-icons/bs";

// for circular graph
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import './SubDashboard.css'

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
    date: number,
    category: string,
    title: string,
    description: string,
    amount: number,
    paymentStatus: string
}

const SubDashboard = () => {

    const PlusIcon = BsPlusLg as React.ComponentType<IconBaseProps>;

    const [balance, setBalance] = useState<number>(20000)
    const [balanceSpent, setBalanceSpent] = useState<number>(14000)

    const [isExpModalActive, setIsExpModalActive] = useState<boolean>(false);

    // FOR BUDGET
    const defaultAllBudget: budgetsModel = {
        UUID: "userid",
        budgetUUID: "all",
        title: "All",
        emoji: "👀",
        limit: Infinity,
        categories: ["Food", "Transport", "Rent", "Entertainment", "Others"],
        description: "This contains all the budgets"
    };
    // user created budgets
    const [userBudgets, setUserBudgets] = useState<budgetsModel[]>(() => {
        const stored = localStorage.getItem("budgets");
        return stored ? JSON.parse(stored) : [];
    });
    // This combines "All" + user budgets for UI
    const budget = [defaultAllBudget, ...userBudgets];

    const [budgetEntries, setBudgetEntries] = useState<budgetEntry[]>(() => {
        const storedEntries = localStorage.getItem("budgetEntries");
        return storedEntries ? JSON.parse(storedEntries) : [];
    });

    // for setting userBudgets
    useEffect(() => {
        localStorage.setItem("budgets", JSON.stringify(userBudgets));
    }, [userBudgets]);

    useEffect(() => {
        localStorage.setItem("budgetEntries", JSON.stringify(budgetEntries));
    }, [budgetEntries]);

    const FindBudgetExpense = (budget: budgetsModel, userEntries: budgetEntry[]) => {
        let sumExpense = 0;
        const allExpenses = userEntries.filter((entry) => entry.budgetUUID === budget.budgetUUID)
        allExpenses.forEach((exp) => {
            sumExpense = sumExpense + exp.amount
        })
        return sumExpense;
    }

    return (
        <div id='sub-dashboard'>
            <div id='sub-dashboard-left'>
                <div id='title'>
                    <span>Hey User Name,</span>
                    <span>Take a look at your current balance 👀</span>
                </div>

                <div id='balance-graph'>
                    <div id='balance'>
                        <span>Balance</span>
                        <span>&#8377; {balance}</span>
                    </div>
                    <div id='graph'>
                        <CircularProgressbar
                            value={((balance - balanceSpent) / balance) * 100}
                            text={`Available ₹${balance - balanceSpent}`}
                            strokeWidth={12}
                            styles={buildStyles({
                                pathColor: "#02f7b4",
                                textColor: "black",
                                trailColor: "#4d69ff",
                                textSize: "8px",
                                strokeLinecap: "straight",
                                pathTransitionDuration: 0.5,
                            })}
                        />
                    </div>
                    <div id="balance-spent">
                        <span>Spent</span>
                        <span>&#8377; {balanceSpent}</span>
                    </div>
                    <div id="balance-available">
                        <span>Available</span>
                        <span>&#8377; {balance - balanceSpent}</span>
                    </div>
                </div>

                <button id='add-expense-btn'
                    onClick={() => setIsExpModalActive(!isExpModalActive)}
                >
                    <PlusIcon
                        className="menu-option-icon"
                        size={22}
                        strokeWidth={0.5}
                        color="#4d69ff"
                    />
                    Add a New Expense
                </button>
            </div>

            <div id='sub-dashboard-right'>
                <div id='sub-dashboard-right-top'>
                    <span>Your Current Budgets</span>
                    <div id='budget-cards'>
                        {userBudgets.map((b, index) => {
                            return (
                                <div className="budget-card">
                                    <div className='budget-card-head'>
                                        <div>{b.title}</div>
                                        <div>{b.emoji}</div>
                                    </div>
                                    <div className='budget-card-body'>
                                        <div>
                                            {b.description}<br></br>
                                            Limit: &#8377;{b.limit}
                                        </div>
                                        <div>
                                            <CircularProgressbar
                                                value={((b.limit - FindBudgetExpense(b, budgetEntries)) / b.limit) * 100}
                                                text={`Available ₹${b.limit - FindBudgetExpense(b, budgetEntries)}`}
                                                strokeWidth={8}
                                                styles={buildStyles({
                                                    pathColor: "#02f7b4",
                                                    textColor: "black",
                                                    trailColor: "#4d69ff",
                                                    textSize: "8px",
                                                    strokeLinecap: "straight",
                                                    pathTransitionDuration: 0.5,
                                                })}
                                            />
                                        </div>
                                        <div>
                                            <div>
                                            <span>Spent</span>
                                            <span>₹{FindBudgetExpense(b, budgetEntries)}</span>
                                            </div>
                                            <div>
                                            <span>Available</span>
                                            <span>₹{b.limit - FindBudgetExpense(b, budgetEntries)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div id='sub-dashboard-right-bottom'>
                    <span>Your Expenses</span>
                    <div id='expenses'>
                        <div id='expense-head'></div>
                        <div className="expense"></div>
                        <div className="expense"></div>
                        <div className="expense"></div>
                        <div className="expense"></div>
                        <div className="expense"></div>
                        <div className="expense"></div>
                        <div className="expense"></div>
                        <div className="expense"></div>
                        <div className="expense"></div>
                        <div className="expense"></div>
                    </div>
                </div>
            </div>

            {/* add expense modal */}
            {!!isExpModalActive && <AddExpenseModal isExpModalActive={isExpModalActive} setIsExpModalActive={setIsExpModalActive} budgets={budget} entries={budgetEntries} setEntries={setBudgetEntries} />}
        </div>
    )
}

export default SubDashboard