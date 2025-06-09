import React, { useEffect, useState } from 'react'
import { IconBaseProps } from "react-icons";
import { BsChevronLeft, BsChevronRight, BsPlusLg, BsPencilSquare, BsTrash3Fill, BsCheckLg } from "react-icons/bs";

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
    date: number,
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
    const EditIcon = BsPencilSquare as React.ComponentType<IconBaseProps>;
    const DeleteIcon = BsTrash3Fill as React.ComponentType<IconBaseProps>;
    const TickIcon = BsCheckLg as React.ComponentType<IconBaseProps>;

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
    const [budget, setBudget] = useState<budgetsModel[]>([
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
    const [activeBudget, setActiveBudget] = useState<string>(budget[0].budgetUUID)

    // const handleAddBudget = (budget: budgetsModel, budgets: budgetsModel[], setBudget: React.Dispatch<React.SetStateAction<budgetsModel[]>>) => {
    //     if(budget){
    //         setBudget([... budgets, budget])
    //     }
    // }

    const [budgetEntries, setBudgetEntries] = useState<budgetEntry[]>([
        {
            entryUUID: "entryid1",
            budgetUUID: "budgetid1",
            date: Date.now(),
            category: "budget 1 category 1",
            title: "Expense 1",
            description: "blah blah blah expense 1 blah blah blah expense 1 blah blah blah",
            amount: 2000,
            paymentStatus: "paid"
        },
        {
            entryUUID: "entryid2",
            budgetUUID: "budgetid3",
            date: Date.now(),
            category: "budget 3 category 1",
            title: "Expense 2",
            description: "blah blah blah expense 2",
            amount: 2000,
            paymentStatus: "paid"
        },
        {
            entryUUID: "entryid3",
            budgetUUID: "budgetid2",
            date: Date.now(),
            category: "budget 2 category 2",
            title: "Expense 3",
            description: "blah blah blah expense 3",
            amount: 3000,
            paymentStatus: "paid"
        },
        {
            entryUUID: "entryid4",
            budgetUUID: "budgetid1",
            date: Date.now(),
            category: "budget 1 category 3",
            title: "Expense 4",
            description: "blah blah blah expense 4",
            amount: 1000,
            paymentStatus: "paid"
        },
        {
            entryUUID: "entryid5",
            budgetUUID: "budgetid1",
            date: Date.now(),
            category: "budget 1 category 1",
            title: "Expense 5",
            description: "blah blah blah expense 1",
            amount: 2000,
            paymentStatus: "paid"
        },
        {
            entryUUID: "entryid6",
            budgetUUID: "budgetid3",
            date: Date.now(),
            category: "budget 3 category 1",
            title: "Expense 6",
            description: "blah blah blah expense 2",
            amount: 2000,
            paymentStatus: "paid"
        },
        {
            entryUUID: "entryid7",
            budgetUUID: "budgetid2",
            date: Date.now(),
            category: "budget 2 category 2",
            title: "Expense 7",
            description: "blah blah blah expense 3",
            amount: 3000,
            paymentStatus: "paid"
        },
        {
            entryUUID: "entryid8",
            budgetUUID: "budgetid1",
            date: Date.now(),
            category: "budget 1 category 3",
            title: "Expense 8",
            description: "blah blah blah expense 4",
            amount: 1000,
            paymentStatus: "paid"
        },
        {
            entryUUID: "entryid9",
            budgetUUID: "budgetid1",
            date: Date.now(),
            category: "budget 1 category 1",
            title: "Expense 9",
            description: "blah blah blah expense 1",
            amount: 2000,
            paymentStatus: "paid"
        },
        {
            entryUUID: "entryid10",
            budgetUUID: "budgetid3",
            date: Date.now(),
            category: "budget 3 category 1",
            title: "Expense 10",
            description: "blah blah blah expense 2",
            amount: 2000,
            paymentStatus: "paid"
        },
        {
            entryUUID: "entryid11",
            budgetUUID: "budgetid1",
            date: 1752537600000, //July date just for test
            category: "budget 1 category 1",
            title: "Expense 11",
            description: "blah blah blah expense 2",
            amount: 2000,
            paymentStatus: "paid"
        },
    ]);

    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [isExpModalActive, setIsExpModalActive] = useState<boolean>(false);

    // For date formating for input feild
    const formatDateForInput = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0]; // gives "YYYY-MM-DD"
    };

    // For editable rows
    const [editableRow, setEditableRow] = useState<string | null>(null);
    const [tempEditEntry, setTempEditEntry] = useState<any | null>(null);

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
                <button id='add-budget' onClick={() => { setIsModalActive(!isModalActive) }}><PlusIcon size={18} color="#4d69ff" strokeWidth={1} />New Budget</button>
                <button id='add-expense' onClick={() => { setIsExpModalActive(!isExpModalActive) }}><PlusIcon size={18} color="#4d69ff" strokeWidth={1} />New Expense</button>
            </div>

            {/* add budget modal */}
            {!!isModalActive && <AddBudgetModal isModalActive={isModalActive} setIsModalActive={setIsModalActive} />}
            {!!isExpModalActive && <AddExpenseModal isModalActive={isExpModalActive} setIsModalActive={setIsExpModalActive} />}

            <div id='budget-container'>
                <div id='budgets-nav'>
                    {budget.map((b, index) => {
                        return (
                            <div key={index} className='b-nav' onClick={() => { setActiveBudget(b.budgetUUID); }}
                                style={{
                                    background: activeBudget === b.budgetUUID ? '#f9f9f9' : 'transparent',
                                    fontWeight: activeBudget === b.budgetUUID ? '600' : '400'
                                }}
                            >{b.title} <span>{b.emoji}</span></div>
                        )
                    })}
                    <div className='b-nav' onClick={() => {setIsModalActive(!isModalActive)}}>
                        <PlusIcon size={18} color="#4d69ff" strokeWidth={1}/>
                    </div>
                </div>
                <div id='budgets-content'>
                    <div className='be-head'>
                        <div className='be-head-cell'>Date</div>
                        <div className='be-head-cell'>Category</div>
                        <div className='be-head-cell'>Title</div>
                        <div className='be-head-cell'>Description</div>
                        <div className='be-head-cell'>Amount</div>
                        <div className='be-head-cell'>Status</div>
                    </div>
                    <div id='budgets-content-entries'>
                        {budgetEntries.filter((be) => {
                            const beDate = new Date(be.date);
                            return (
                                be.budgetUUID === activeBudget &&
                                beDate.getMonth() === currentMonth.getMonth() &&
                                beDate.getFullYear() === currentMonth.getFullYear()
                            );
                        }).map((be, index) => {
                            const isEditing = editableRow === be.entryUUID; // boolean to check entryUUID
                            return (
                                <div
                                    key={index}
                                    className='be-row'
                                    style={{ background: isEditing ? '#eff1ff' : 'transparent' }}
                                >
                                    {/* Date */}
                                    <input
                                        type='date'
                                        value={formatDateForInput(isEditing ? tempEditEntry?.date : be.date)}
                                        className='be-cell'
                                        readOnly={!isEditing}
                                        onChange={(e) => {
                                            const updatedDate = new Date(e.target.value).getTime();
                                            setTempEditEntry({ ...tempEditEntry, date: updatedDate });
                                        }}
                                    />

                                    {/* Category */}
                                    {isEditing ? (
                                        <select
                                            className='be-cell'
                                            value={tempEditEntry?.category || ''}
                                            onChange={(e) => setTempEditEntry({ ...tempEditEntry, category: e.target.value })}
                                        >
                                            {budget.find((b) => b.budgetUUID === activeBudget)?.categories.map((cat, idx) => (
                                                <option key={idx} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input type='text' value={be.category} className='be-cell' readOnly />
                                    )}

                                    {/* Title */}
                                    <input
                                        type='text'
                                        value={isEditing ? tempEditEntry?.title : be.title}
                                        className='be-cell'
                                        readOnly={!isEditing}
                                        onChange={(e) => setTempEditEntry({ ...tempEditEntry, title: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                setEditableRow(null);
                                            }
                                        }}
                                    />

                                    {/* Description */}
                                    <textarea
                                        value={isEditing ? tempEditEntry?.description : be.description}
                                        className='be-cell'
                                        readOnly={!isEditing}
                                        onChange={(e) => setTempEditEntry({ ...tempEditEntry, description: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                setEditableRow(null);
                                            }
                                        }}
                                    />

                                    {/* Amount */}
                                    <input
                                        type='number'
                                        value={isEditing ? tempEditEntry?.amount : be.amount}
                                        className='be-cell'
                                        readOnly={!isEditing}
                                        onChange={(e) => setTempEditEntry({ ...tempEditEntry, amount: Number(e.target.value) })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                setEditableRow(null);
                                            }
                                        }}
                                    />

                                    {/* Status */}
                                    {isEditing ? (
                                        <select
                                            className='be-cell'
                                            value={tempEditEntry?.paymentStatus || ''}
                                            onChange={(e) => setTempEditEntry({ ...tempEditEntry, paymentStatus: e.target.value })}
                                        >
                                            <option value='paid'>paid</option>
                                            <option value='pending'>pending</option>
                                        </select>
                                    ) : (
                                        <input type='text' value={be.paymentStatus} className='be-cell' readOnly />
                                    )}

                                    {/* Buttons */}
                                    <div className='edit-del-btn'>
                                        {!isEditing && (
                                            <div
                                                className='edit-btn'
                                                onClick={() => {
                                                    setEditableRow(be.entryUUID);
                                                    setTempEditEntry({ ...be });
                                                }}
                                            >
                                                <EditIcon size={16} color='#4d69ff' strokeWidth={0.3} />
                                            </div>
                                        )}

                                        {isEditing && (
                                            <>
                                                <div
                                                    className='tick-btn'
                                                    onClick={() => {
                                                        const updatedEntries = budgetEntries.map((entry) =>
                                                            entry.entryUUID === tempEditEntry.entryUUID ? tempEditEntry : entry
                                                        );
                                                        setBudgetEntries(updatedEntries);
                                                        setEditableRow(null);
                                                        setTempEditEntry(null);
                                                    }}
                                                >
                                                    <TickIcon size={16} color='palegreen' strokeWidth={1} />
                                                </div>

                                                <div
                                                    className='tick-btn'
                                                    onClick={() => {
                                                        setEditableRow(null);
                                                        setTempEditEntry(null);
                                                    }}
                                                >
                                                    <PlusIcon style={{ rotate: '45deg' }} size={16} color='tomato' strokeWidth={1} />
                                                </div>
                                            </>
                                        )}

                                        {!isEditing && (
                                            <div className='delete-btn'>
                                                <DeleteIcon size={16} color='tomato' />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        {budgetEntries.filter((be) => {
                            const beDate = new Date(be.date);
                            return (
                                be.budgetUUID === activeBudget &&
                                beDate.getMonth() === currentMonth.getMonth() &&
                                beDate.getFullYear() === currentMonth.getFullYear()
                            );
                        }).length < 1 && <div style={{fontSize: '12px', margin: '10px 15px'}}>No Entries Found</div>}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Budgets