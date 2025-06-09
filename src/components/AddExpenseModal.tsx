import React from 'react'

import './AddExpenseModal.css'

interface Props{
    isModalActive: boolean,
    setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

const AddExpenseModal = ({isModalActive, setIsModalActive} : Props) => {
    return (
        <div id='add-expense-overlay' style={{display: isModalActive? 'flex': 'hidden'}}>
            <div id="add-expense-modal">
                <h2>Add a New Expense</h2>
                <form>
                    <label>
                        Budget:
                        <select>
                            <option>Main</option>
                            <option>Budget 1</option>
                            <option>Budget 2</option>
                            <option>Budget 3</option>
                            <option>Budget 4</option>
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
                        <button type="button" onClick={()=> setIsModalActive(!isModalActive)}>Cancel</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddExpenseModal