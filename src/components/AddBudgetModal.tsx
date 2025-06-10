import React, { useState, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { v4 as uuidv4 } from 'uuid'; // install with: npm install uuid

import './AddBudgetModal.css';

interface Budget {
    UUID: string;
    budgetUUID: string;
    title: string;
    emoji: string;
    limit: number;
    categories: string[];
    description: string;
}

interface Props {
    isModalActive: boolean;
    setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
    budgets: Budget[];
    setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
}

const AddBudgetModal = ({ isModalActive, setIsModalActive, budgets, setBudgets }: Props) => {

    // form state
    const [selectedEmoji, setSelectedEmoji] = useState<string>('');
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [limit, setLimit] = useState<string>(''); // keep as string for input validation
    const [description, setDescription] = useState<string>('');

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setSelectedEmoji(emojiData.emoji);
        setShowPicker(false);
    };

    const addTag = () => {
        const trimmed = input.trim();
        if (trimmed && !tags.includes(trimmed)) {
            setTags([...tags, trimmed]);
        }
        setInput('');
    };

    const removeTag = (indexToRemove: number) => {
        setTags(tags.filter((_, i) => i !== indexToRemove));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !selectedEmoji || tags.length === 0 || !limit.trim() || !description.trim()) {
            alert('Please fill out all fields.');
            return;
        }

        const parsedLimit = Number(limit);
        if (isNaN(parsedLimit) || parsedLimit < 100) {
            alert('Limit should be a number greater than or equal to 100.');
            return;
        }

        const newBudget: Budget = {
            UUID: "userid",
            budgetUUID: uuidv4(),
            title: title.trim(),
            emoji: selectedEmoji,
            limit: parsedLimit,
            categories: tags,
            description: description.trim(),
        };

        setBudgets(prev => [...prev, newBudget]);
        alert('Budget added successfully!');
        setIsModalActive(false);

        // reset form
        setTitle('');
        setSelectedEmoji('');
        setTags([]);
        setInput('');
        setLimit('');
        setDescription('');
    };

    return (
        <div id='add-budget-overlay' style={{ display: isModalActive ? 'flex' : 'none' }}>
            <div id="add-budget-modal">
                <h2>Add a New Budget</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            type="text"
                            placeholder="e.g. Bike expenses"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>

                    <label>
                        Emoji:
                        <div id='emoji-picker'>
                            <input
                                id="emoji"
                                type="text"
                                value={selectedEmoji}
                                placeholder="Click emoji icon to pick"
                                readOnly
                            />
                            <button
                                id='emoji-button'
                                type="button"
                                onClick={() => setShowPicker(!showPicker)}
                            >
                                😊
                            </button>
                            {showPicker && (
                                <div id='picker' style={{ marginTop: '20px', display: 'inline-block' }}>
                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                </div>
                            )}
                        </div>
                    </label>

                    <label>
                        Limit (₹):
                        <input
                            type="number"
                            placeholder="e.g. 9999"
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                        />
                    </label>

                    <label>
                        Category (create categories):
                    </label>
                    <div
                        style={{
                            border: '1px solid #ccc',
                            padding: '8px',
                            borderRadius: '4px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '5px',
                        }}
                    >
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                style={{
                                    background: '#e0e0e0',
                                    padding: '5px 10px',
                                    borderRadius: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '14px',
                                }}
                            >
                                {tag}
                                <span
                                    style={{
                                        marginLeft: '8px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                    }}
                                    onClick={() => removeTag(index)}
                                >
                                    &times;
                                </span>
                            </div>
                        ))}
                        <input
                            type="text"
                            placeholder="Type and press Enter"
                            value={input}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            style={{
                                border: 'none',
                                outline: 'none',
                                flex: 1,
                                fontSize: '14px',
                                minWidth: '120px',
                            }}
                        />
                    </div>

                    <label>
                        Description:
                        <textarea
                            placeholder="Add optional notes..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>

                    <div className="modal-buttons">
                        <button type="submit">Add Budget</button>
                        <button type="button" onClick={() => setIsModalActive(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBudgetModal;
