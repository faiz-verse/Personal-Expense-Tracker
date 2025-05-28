import React, { useState } from 'react';

import './App.css';

import Button from './components/Button';
import './components/Button.css'

function App() {

    const [value, setValue] = useState(1)

    return (
        <div id='App'>
            <div>
                <span style={{ fontWeight: 800, fontSize: "18px" }}>{value}</span>
                <Button onClick={() => setValue(value + 1)} text="Click Me"></Button>
            </div>
        </div>
    );
}

export default App;
