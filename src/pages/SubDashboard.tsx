import React, { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

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

// importing context hook to use the context
import { useActiveBudgetContext } from '../context/DashboardContext';

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

    // for navigating to the budgets
    const navigate = useNavigate();
    const { activeBudget, setActiveBudget } = useActiveBudgetContext(); // using context with hook

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
            if (exp.paymentStatus.toLocaleLowerCase() === "paid") {
                sumExpense = sumExpense + exp.amount
            }
        })
        return sumExpense;
    }
    const FindPendingExpenses = (budget: budgetsModel, userEntries: budgetEntry[]) => {
        let pendingExpense = 0;
        const allExpenses = userEntries.filter((entry) => entry.budgetUUID === budget.budgetUUID)
        allExpenses.forEach((exp) => {
            if (exp.paymentStatus.toLocaleLowerCase() !== "paid") {
                pendingExpense = pendingExpense + exp.amount
            }
        })
        return pendingExpense;
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
                    {userBudgets.length > 0 ? <div id='budget-cards'>
                        {userBudgets.map((b, index) => {
                            return (
                                <div className="budget-card" onClick={() => { navigate("/dashboard/budgets"); setActiveBudget(b.budgetUUID) }}>
                                    <div className='budget-card-head'>
                                        <div>{b.title}</div>
                                        <div>{b.emoji}</div>
                                    </div>
                                    <div className='budget-card-body'>
                                        <div>
                                            {b.description}<br></br>
                                        </div>
                                        <div>
                                            <CircularProgressbar
                                                value={((b.limit - FindBudgetExpense(b, budgetEntries)) / b.limit) * 100}
                                                text={`Available ₹${b.limit - FindBudgetExpense(b, budgetEntries)}`}
                                                strokeWidth={6}
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
                                        <div className='scale'>
                                            <p>Limit: <b>&#8377;{b.limit}</b></p>
                                            <p>Spent: <b>₹{FindBudgetExpense(b, budgetEntries)}</b></p>
                                            {FindPendingExpenses(b, budgetEntries) > 0 &&
                                                <p>Pending: <b>₹{FindBudgetExpense(b, budgetEntries)}</b></p>
                                            }
                                            <p>Available: <b>₹{(b.limit - FindBudgetExpense(b, budgetEntries))}</b></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div> :
                        <span>No Added Budgets</span>
                    }
                </div>
                <div id='sub-dashboard-right-bottom'>
                    <span>Your Expenses</span>
                    <div id='expenses'>
                        <div id='expense-head'>
                            <div className='e-head'>Date</div>
                            <div className='e-head'>Category</div>
                            <div className='e-head'>Title</div>
                            <div className='e-head'>Amount</div>
                            <div className='e-head'>Status</div>
                        </div>

                        {budgetEntries.filter((be) => be.paymentStatus.toLocaleLowerCase() === "paid").reverse().map((be, index) => {
                            return (
                                <div className="expense">
                                    <div className='e-row'>{new Date(be.date).toLocaleDateString()}</div>
                                    <div className='e-row'>{be.category}</div>
                                    <div className='e-row'>{be.title}</div>
                                    <div className='e-row'>{be.amount}</div>
                                    <div className='e-row'>{be.paymentStatus}</div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>

            {/* add expense modal */}
            {!!isExpModalActive && <AddExpenseModal isExpModalActive={isExpModalActive} setIsExpModalActive={setIsExpModalActive} budgets={budget} entries={budgetEntries} setEntries={setBudgetEntries} />}
        </div>
    )
}

export default SubDashboard