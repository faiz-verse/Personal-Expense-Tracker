import React, { useState } from 'react'

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