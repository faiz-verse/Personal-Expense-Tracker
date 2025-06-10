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

    const [activeBudget, setActiveBudget] = useState<string>("all")

    const [budgetEntries, setBudgetEntries] = useState<budgetEntry[]>(() => {
        const storedEntries = localStorage.getItem("budgetEntries");
        return storedEntries ? JSON.parse(storedEntries) : [];
    });

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

    // for setting userBudgets
    useEffect(() => {
        localStorage.setItem("budgets", JSON.stringify(userBudgets));
    }, [userBudgets]);

    useEffect(() => {
        localStorage.setItem("budgetEntries", JSON.stringify(budgetEntries));
    }, [budgetEntries]);

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
            {!!isModalActive && <AddBudgetModal isModalActive={isModalActive} setIsModalActive={setIsModalActive} budgets={userBudgets} setBudgets={setUserBudgets} />}
            {!!isExpModalActive && <AddExpenseModal isExpModalActive={isExpModalActive} setIsExpModalActive={setIsExpModalActive} budgets={budget} entries={budgetEntries} setEntries={setBudgetEntries} />}

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
                    <div className='b-nav' onClick={() => { setIsModalActive(!isModalActive) }}>
                        <PlusIcon size={18} color="#4d69ff" strokeWidth={1} />
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
                            const isInMonth =
                                beDate.getMonth() === currentMonth.getMonth() &&
                                beDate.getFullYear() === currentMonth.getFullYear();

                            const isMatchingBudget =
                                activeBudget === "all" || be.budgetUUID === activeBudget;

                            return isInMonth && isMatchingBudget;
                        }).sort((a, b) => a.date - b.date).map((be, index) => {
                            const isEditing = editableRow === be.entryUUID && activeBudget !== 'all'; // boolean to check entryUUID
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
                                        <input type='text' style={{ color: be.paymentStatus === 'paid' ? 'palegreen' : 'tomato' }} value={be.paymentStatus} className='be-cell' readOnly />
                                    )}

                                    {/* Buttons */}
                                    {activeBudget !== 'all' && <div className='edit-del-btn'>
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
                                            <div className='delete-btn' onClick={() => {
                                                const confirmed = window.confirm("Are you sure you want to delete this entry?");
                                                if (confirmed) {
                                                    const updatedEntries = budgetEntries.filter(entry => entry.entryUUID !== be.entryUUID);
                                                    setBudgetEntries(updatedEntries);
                                                }
                                            }}>
                                                <DeleteIcon size={16} color='tomato' />
                                            </div>
                                        )}
                                    </div>}
                                </div>
                            );
                        })}
                        {/* If no entries */}
                        {budgetEntries.filter((be) => {
                            const beDate = new Date(be.date);
                            const isInMonth =
                                beDate.getMonth() === currentMonth.getMonth() &&
                                beDate.getFullYear() === currentMonth.getFullYear();

                            const isMatchingBudget =
                                activeBudget === "all" || be.budgetUUID === activeBudget;

                            return isInMonth && isMatchingBudget;
                        }).length < 1 && <div style={{ fontSize: '12px', margin: '10px 15px' }}>No Entries Found</div>}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Budgets