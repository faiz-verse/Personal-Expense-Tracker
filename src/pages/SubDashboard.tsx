import React, { useState } from 'react';

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

const SubDashboard = () => {

    const PlusIcon = BsPlusLg as React.ComponentType<IconBaseProps>;

    const [balance, setBalance] = useState<number>(20000)
    const [balanceSpent, setBalanceSpent] = useState<number>(14000)

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

                <button id='add-expense-btn'>
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
                    <div className="budget-card"></div>
                    <div className="budget-card"></div>
                    <div className="budget-card"></div>
                    <div className="budget-card"></div>
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
            <AddExpenseModal/>
        </div>
    )
}

export default SubDashboard