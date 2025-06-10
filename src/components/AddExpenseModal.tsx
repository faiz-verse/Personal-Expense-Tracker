import React, {useState} from 'react'

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

    return (
        <div id='add-expense-overlay' style={{ display: isExpModalActive ? 'flex' : 'hidden' }}>
            <div id="add-expense-modal">
                <h2>Add a New Expense</h2>
                <form>
                    <label>
                        Budget:
                        <select>
                            {budgets.map((b, index) => {
                                return (
                                    <option value={b.budgetUUID}>{b.title}</option>
                                );
                            })}
                        </select>
                    </label>

                    <label>
                        Date:
                        <input type="date" />
                    </label>

                    <label>
                        Category:
                        <select>
                            <option>Food</option>
                            <option>Transport</option>
                            <option>Rent</option>
                            <option>Entertainment</option>
                            <option>Others</option>
                        </select>
                    </label>

                    <label>
                        Title:
                        <input type="text" placeholder="e.g. Grocery shopping" />
                    </label>

                    <label>
                        Amount (₹):
                        <input type="number" placeholder="e.g. 1500" />
                    </label>

                    <label>
                        Payment Status:
                        <select>
                            <option>Paid</option>
                            <option>Pending</option>
                        </select>
                    </label>

                    <label>
                        Description:
                        <textarea placeholder="Add optional notes..." />
                    </label>

                    <div className="modal-buttons">
                        <button type="submit">Add Expense</button>
                        <button type="button" onClick={() => setIsExpModalActive(!isExpModalActive)}>Cancel</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddExpenseModal