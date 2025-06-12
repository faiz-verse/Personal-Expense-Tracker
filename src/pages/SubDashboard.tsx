import React, { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import { IconBaseProps } from "react-icons";
import { BsPlusLg, BsChevronLeft, BsChevronRight, BsTrash3Fill } from "react-icons/bs";

// for circular graph
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import './SubDashboard.css'

import AddExpenseModal from '../components/AddExpenseModal';
import AddBudgetModal from '../components/AddBudgetModal';

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
    const LeftArrow = BsChevronLeft as React.ComponentType<IconBaseProps>;
    const RightArrow = BsChevronRight as React.ComponentType<IconBaseProps>;
    const DeleteIcon = BsTrash3Fill as React.ComponentType<IconBaseProps>;

    const [isExpModalActive, setIsExpModalActive] = useState<boolean>(false);
    const [isModalActive, setIsModalActive] = useState<boolean>(false);

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

    // for setting userBudgets and entries
    useEffect(() => {
        localStorage.setItem("budgets", JSON.stringify(userBudgets));
    }, [userBudgets]);
    useEffect(() => {
        localStorage.setItem("budgetEntries", JSON.stringify(budgetEntries));
    }, [budgetEntries]);

    // Functions to find all the expenses and pendings
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

    // Month selector for the Balance Tracking
    // For month change
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [monthlyBalances, setMonthlyBalances] = useState<{ month: number; year: number; balance: number }[]>(() => {
        const stored = localStorage.getItem("monthlyBalances");
        return stored ? JSON.parse(stored) : [];
    });
    // handle prev and next to change current month
    const handlePrev = () => {
        const prevMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() - 1));
        setCurrentMonth(new Date(prevMonth));
    };
    const handleNext = () => {
        const nextMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
        setCurrentMonth(new Date(nextMonth));
    };
    // get balance for the current month
    const getBalanceForCurrentMonth = () => {
        const found = monthlyBalances.find(
            (b) =>
                b.month === currentMonth.getMonth() &&
                b.year === currentMonth.getFullYear()
        );
        return found?.balance || 0;
    };
    // Add or update balance
    const handleAddOrUpdateBalance = (newBalance: number) => {
        const month = currentMonth.getMonth();
        const year = currentMonth.getFullYear();

        setMonthlyBalances((prev) => {
            const existingIndex = prev.findIndex((b) => b.month === month && b.year === year);
            if (existingIndex !== -1) {
                // Update existing
                const updated = [...prev];
                updated[existingIndex].balance = newBalance;
                return updated;
            } else {
                // Add new
                return [...prev, { month, year, balance: newBalance }];
            }
        });
    };
    // Balance
    const [balance, setBalance] = useState<number>(0);
    useEffect(() => {
        setBalance(getBalanceForCurrentMonth());
    }, [currentMonth, monthlyBalances]);

    const [balanceSpent, setBalanceSpent] = useState<number>(0)
    useEffect(() => {
        const currentMonthSpent = budgetEntries.reduce((acc, entry) => {
            const entryDate = new Date(entry.date);
            const isSameMonth =
                entryDate.getMonth() === currentMonth.getMonth() &&
                entryDate.getFullYear() === currentMonth.getFullYear();

            if (entry.paymentStatus === "paid" && isSameMonth) {
                return acc + entry.amount;
            }
            return acc;
        }, 0);

        setBalanceSpent(currentMonthSpent);
    }, [budgetEntries, currentMonth]);

    useEffect(() => {
        const stored = localStorage.getItem("monthlyBalances");
        if (stored) {
            setMonthlyBalances(JSON.parse(stored));
            console.log(JSON.parse(stored))
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("monthlyBalances", JSON.stringify(monthlyBalances));
    }, [monthlyBalances]);


    return (
        <div id='sub-dashboard'>

            <button id="clear-data-btn" onClick={()=>{
                    const isConfirm = window.confirm("Are you sure? All the data will be lost!");
                    if(isConfirm){
                        localStorage.clear();
                        window.location.reload();
                    }
                }}><DeleteIcon size={16} color='tomato'/>Clear all Data</button>

            <div id='sub-dashboard-left'>
                <div id='title'>
                    <span>Hey There!</span>
                    <span>Take a look at your current balance 👀</span>
                </div>

                <div id='container-month'>
                    <button id='prev' onClick={handlePrev}><LeftArrow size={16} color='4d69ff' strokeWidth={1} /></button>
                    <span>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                    <button id='next' onClick={handleNext}><RightArrow size={16} color='4d69ff' strokeWidth={1} /></button>
                </div>

                <span style={{color: 'gray', fontSize: '12px'}}>Add a balance if it’s missing, or update it if your monthly income or limit has changed.</span>

                <button id='add-balance'
                    onClick={() => {
                        const userInput = prompt(`Enter balance for the month: ${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`);
                        if (userInput) {
                            const newBalance = parseFloat(userInput);
                            if (!isNaN(newBalance)) {
                                handleAddOrUpdateBalance(newBalance);
                            }
                        }
                    }}
                ><PlusIcon
                        className="menu-option-icon"
                        size={22}
                        strokeWidth={0.5}
                        color="#4d69ff"
                    />Add / Update Balance
                </button>


                <div id='balance-graph'>
                    <div id='balance'>
                        <span>Balance</span>
                        <span>&#8377; {balance || "Not Set"}</span>
                    </div>
                    <div id='graph'>
                        <CircularProgressbar
                            value={balance > 0 ? ((balance - balanceSpent) / balance) * 100 : 0}
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
                        <span style={{color: 'tomato'}}>&#8377; {balanceSpent}</span>
                    </div>
                    <div id="balance-available">
                        <span>Available</span>
                        <span style={{color: (balance - balanceSpent) < 0 ? 'tomato': (balance - balanceSpent) >= 1000 ? 'palegreen': 'black'}}>&#8377; {balance - balanceSpent}</span>
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
                                            <p className='limit'>Limit: <b>&#8377;{b.limit}</b></p>
                                            <p className='spent'>Spent: <b>₹{FindBudgetExpense(b, budgetEntries)}</b></p>
                                            {FindPendingExpenses(b, budgetEntries) > 0 &&
                                                <p className='pending'>Pending: <b>₹{FindPendingExpenses(b, budgetEntries)}</b></p>
                                            }
                                            <p className='available'>Available: <b>₹{(b.limit - FindBudgetExpense(b, budgetEntries))}</b></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div> :
                        <div id='no-budget-notifier'>
                            <span>No added budgets</span>
                            <p>You can also create your own custom budgets to keep track of specific types of expenses, such as groceries, travel, entertainment, or utilities. This helps you organize your spending and stay within your financial goals more easily.</p>
                            <button id='add-budget' onClick={() => { setIsModalActive(!isModalActive) }}><PlusIcon size={18} color="#4d69ff" strokeWidth={1} />Add a New Budget</button>
                        </div>
                    }
                </div>
                <div id='sub-dashboard-right-bottom'>
                    <span>Your Expenses</span>
                    {budgetEntries.length > 0 ? <div id='expenses'>
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
                                    <div className='e-row' style={{ color: 'palegreen' }}>{be.paymentStatus}</div>
                                </div>
                            );
                        })}

                    </div> :
                        <div>
                            <span>No expenses yet!</span>
                            <p>You haven't added any expenses yet. Start by adding your first expense — it will be automatically categorized under the default 'All' budget unless you choose a specific one.</p>
                        </div>
                    }

                </div>
            </div>

            {/* add expense and add budget modal */}
            {!!isExpModalActive && <AddExpenseModal isExpModalActive={isExpModalActive} setIsExpModalActive={setIsExpModalActive} budgets={budget} entries={budgetEntries} setEntries={setBudgetEntries} />}
            {!!isModalActive && <AddBudgetModal isModalActive={isModalActive} setIsModalActive={setIsModalActive} budgets={userBudgets} setBudgets={setUserBudgets} />}
        </div>
    )
}

export default SubDashboard