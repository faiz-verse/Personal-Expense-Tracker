import React, { useState } from 'react'

import './History.css'

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

const History = () => {

    const [budgetEntries, setBudgetEntries] = useState<budgetEntry[]>(() => {
            const storedEntries = localStorage.getItem("budgetEntries");
            return storedEntries ? JSON.parse(storedEntries) : [];
        });

    return (
        <div id='history'>
            <div id='title'>
                <span>Transaction History</span>
                <span>History of all your expenses 💸</span>
            </div>

            <div id='all-expenses'>
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
    )
}

export default History