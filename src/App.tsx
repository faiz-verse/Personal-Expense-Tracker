import React, { useState } from "react";

// For Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

// Importing Pages
import Home from "./pages/Home";
import "./pages/Home.css";
import Dashboard from "./pages/Dashboard";
import "./pages/Dashboard.css";

import Button from "./components/Button";
import "./components/Button.css";

function App() {
    const [value, setValue] = useState(1);

    return (
        <div id="App">
            <div>
                <span style={{ fontWeight: 800, fontSize: "18px" }}>{value}</span>
                <Button onClick={() => setValue(value + 1)} text="Click Me"></Button>
            </div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
