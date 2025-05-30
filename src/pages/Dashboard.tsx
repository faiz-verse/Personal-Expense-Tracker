import React, { useState } from "react";

import { IconBaseProps } from "react-icons";
import {
    BsFillHouseDoorFill,
    BsFileEarmarkBarGraphFill,
    BsPiggyBankFill,
    BsArrowLeftRight,
    BsArrowBarLeft,
} from "react-icons/bs";

// for navigating back to the home
import { useNavigate } from "react-router-dom";

// For Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = () => {
    // for icons
    const DashboardIcon =
        BsFillHouseDoorFill as React.ComponentType<IconBaseProps>;
    const ReportIcon =
        BsFileEarmarkBarGraphFill as React.ComponentType<IconBaseProps>;
    const BudgetIcon = BsPiggyBankFill as React.ComponentType<IconBaseProps>;
    const HistoryIcon = BsArrowLeftRight as React.ComponentType<IconBaseProps>;
    const BackIcon = BsArrowBarLeft as React.ComponentType<IconBaseProps>;

    const [activeView, setActiveView] = useState<string>("dashboard");

    const navigate = useNavigate();

    return (
        <div id="Dashboard">
            <div id="side-menu">
                <div id="side-menu-title">ExTrack</div>
                <div id="menu-options">
                    <div
                        className="menu-option"
                        id="dashboard-option"
                        onClick={() => {
                            setActiveView("dashboard");
                        }}
                        style={{
                            background:
                                activeView === "dashboard" ? "#cdd5ff" : "transparent",
                            fontWeight: activeView === "dashboard" ? "600" : "",
                        }}
                    >
                        <DashboardIcon
                            className="menu-option-icon"
                            size={20}
                            color={activeView === "dashboard" ? "white" : "#4d69ff"}
                            style={{
                                background: activeView === "dashboard" ? "#4d69ff" : "white",
                            }}
                        />
                        Dashboard
                    </div>
                    <div
                        className="menu-option"
                        id="resports-option"
                        onClick={() => {
                            setActiveView("reports");
                        }}
                        style={{
                            background: activeView === "reports" ? "#cdd5ff" : "transparent",
                            fontWeight: activeView === "reports" ? "600" : "",
                        }}
                    >
                        <ReportIcon
                            className="menu-option-icon"
                            size={20}
                            color={activeView === "reports" ? "white" : "#4d69ff"}
                            style={{
                                background: activeView === "reports" ? "#4d69ff" : "white",
                            }}
                        />
                        Reports
                    </div>
                    <div
                        className="menu-option"
                        id="budgets-option"
                        onClick={() => {
                            setActiveView("budgets");
                        }}
                        style={{
                            background: activeView === "budgets" ? "#cdd5ff" : "transparent",
                            fontWeight: activeView === "budgets" ? "600" : "",
                        }}
                    >
                        <BudgetIcon
                            className="menu-option-icon"
                            size={20}
                            color={activeView === "budgets" ? "white" : "#4d69ff"}
                            style={{
                                background: activeView === "budgets" ? "#4d69ff" : "white",
                            }}
                        />
                        Budgets
                    </div>
                    <div
                        className="menu-option"
                        id="profile-option"
                        onClick={() => {
                            setActiveView("history");
                        }}
                        style={{
                            background: activeView === "history" ? "#cdd5ff" : "transparent",
                            fontWeight: activeView === "history" ? "600" : "",
                        }}
                    >
                        <HistoryIcon
                            className="menu-option-icon"
                            size={20}
                            strokeWidth={0.5}
                            color={activeView === "history" ? "white" : "#4d69ff"}
                            style={{
                                background: activeView === "history" ? "#4d69ff" : "white",
                            }}
                        />
                        Transaction History
                    </div>
                </div>
                <div id="menu-footer">
                    <BackIcon
                        onClick={() => navigate("/")}
                        className="back-icon"
                        size={20}
                        strokeWidth={0.5}
                        color="#4d69ff"
                    />{" "}
                    User Name
                </div>
            </div>

            <div id="View">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/dashboard" element={<Dashboard />}></Route>
                    </Routes>
                </Router>
            </div>
        </div>
    );
};

export default Dashboard;
