import React, { useState } from "react";

// For Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

// Importing Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {

    return (
        <div id="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/dashboard/*" element={<Dashboard />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
