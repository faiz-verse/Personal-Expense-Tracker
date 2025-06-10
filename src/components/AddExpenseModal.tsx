import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

import './AddExpenseModal.css'

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

interface Props {
    isExpModalActive: boolean;
    setIsExpModalActive: React.Dispatch<React.SetStateAction<boolean>>;
    budgets: budgetsModel[];
    entries: budgetEntry[];
    setEntries: React.Dispatch<React.SetStateAction<budgetEntry[]>>;
}

const AddExpenseModal = ({ isExpModalActive, setIsExpModalActive, budgets, entries, setEntries }: Props) => {

    // submit logic
    const [selectedBudget, setSelectedBudget] = useState<string>(budgets[0]?.budgetUUID || '');
    const [date, setDate] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [paymentStatus, setPaymentStatus] = useState<string>('Paid');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        const budget = budgets.find(b => b.budgetUUID === selectedBudget);
        if (budget && budget.categories.length > 0) {
            setCategory(budget.categories[0]); // set first category as default
        } else {
            setCategory('');
        }
    }, [selectedBudget, budgets]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedBudget || !date || !category || !title.trim() || !amount.trim()) {
            alert('Please fill all required fields.');
            return;
        }

        const numericAmount = Number(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            alert('Amount must be a positive number.');
            return;
        }

        const newEntry: budgetEntry = {
            entryUUID: uuidv4(),
            budgetUUID: selectedBudget,
            date: new Date(date).getTime(),
            category: category.trim(),
            title: title.trim(),
            description: description.trim(),
            amount: numericAmount,
            paymentStatus: paymentStatus.toLowerCase(),
        };

        setEntries([...entries, newEntry]);
        setIsExpModalActive(false);

        // Reset fields
        setSelectedBudget(budgets[0]?.budgetUUID || '');
        setDate('');
        setCategory('');
        setTitle('');
        setAmount('');
        setPaymentStatus('Paid');
        setDescription('');
    };

    return (
        <div id='add-expense-overlay' style={{ display: isExpModalActive ? 'flex' : 'none' }}>
            <div id="add-expense-modal">
                <h2>Add a New Expense</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Budget:
                        <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
                            {budgets.map((b, index) => (
                                <option key={index} value={b.budgetUUID}>
                                    {b.title}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Date:
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </label>

                    <label>
                        Category:
                        <select value={category} onChange={(e) => setCategory(e.target.value)} >
                            { budgets.find((b) => b.budgetUUID === selectedBudget)
                                    ?.categories.map((cat, idx) => (
                                        <option key={idx} value={cat}>
                                            {cat}
                                        </option>
                                    ))
                            }
                        </select>
                    </label>

                    <label>
                        Title:
                        <input
                            type="text"
                            placeholder="e.g. Grocery shopping"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>

                    <label>
                        Amount (₹):
                        <input
                            type="number"
                            placeholder="e.g. 1500"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </label>

                    <label>
                        Payment Status:
                        <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                            <option>Paid</option>
                            <option>Pending</option>
                        </select>
                    </label>

                    <label>
                        Description:
                        <textarea
                            placeholder="Add optional notes..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>

                    <div className="modal-buttons">
                        <button type="submit">Add Expense</button>
                        <button type="button" onClick={() => setIsExpModalActive(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddExpenseModal