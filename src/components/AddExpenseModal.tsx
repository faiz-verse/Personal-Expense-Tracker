import React from 'react'

import './AddExpenseModal.css'

const AddExpenseModal = () => {
    return (
        <div id='add-expense-overlay'>
            <div id="add-expense-modal">
                <h2>Add a New Expense</h2>

                <form>
                    <label>
                        Title:
                        <input type="text" placeholder="e.g. Grocery shopping" />
                    </label>

                    <label>
                        Amount (₹):
                        <input type="number" placeholder="e.g. 1500" />
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
                        Date:
                        <input type="date" />
                    </label>

                    <label>
                        Description:
                        <textarea placeholder="Add optional notes..." />
                    </label>

                    <div className="modal-buttons">
                        <button type="submit">Add Expense</button>
                        <button type="button">Cancel</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddExpenseModal