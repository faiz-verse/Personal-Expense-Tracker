import React, { useState, KeyboardEvent, ChangeEvent } from 'react'

// for emoji picker
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import './AddBudgetModal.css'

interface Props {
    isModalActive: boolean,
    setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

const AddBudgetModal = ({ isModalActive, setIsModalActive }: Props) => {

    const [selectedEmoji, setSelectedEmoji] = useState<string>('');
    const [showPicker, setShowPicker] = useState<boolean>(false);

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setSelectedEmoji(emojiData.emoji);
        setShowPicker(false);
    };

    // Add Tag Area
    const [tags, setTags] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

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

    return (
        <div id='add-budget-overlay' style={{ display: isModalActive ? 'flex' : 'hidden' }}>
            <div id="add-budget-modal">
                <h2>Add a New Budget</h2>
                <form>
                    <label>
                        Title:
                        <input type="text" placeholder="e.g. Bike expenses" />
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

                            <button id='emoji-button'
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
                        <input type="number" placeholder="e.g. 9999" />
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
                        <textarea placeholder="Add optional notes..." />
                    </label>

                    <div className="modal-buttons">
                        <button type="submit">Add Budget</button>
                        <button type="button" onClick={() => setIsModalActive(!isModalActive)}>Cancel</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddBudgetModal