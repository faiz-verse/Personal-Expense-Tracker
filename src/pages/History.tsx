import React from 'react'

import './History.css'

const History = () => {
    return (
        <div id='history'>
            <div id='title'>
                <span>Transaction History</span>
                <span>History of all your expenses 💸</span>
            </div>

            <div id='all-expenses'>
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
    )
}

export default History