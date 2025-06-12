import React, { useState, useEffect } from "react";

import { IconBaseProps } from "react-icons";
import {
    BsFillHouseDoorFill,
    BsFileEarmarkBarGraphFill,
    BsPiggyBankFill,
    BsArrowLeftRight,
    BsArrowBarLeft,
    BsArrowBarRight,
    BsPlusLg,
} from "react-icons/bs";

// for navigating back to the home
import { useLocation, useNavigate } from "react-router-dom";

// For Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./Dashboard.css";

// importing sub pages (views)
import SubDashboard from "./SubDashboard";
import Reports from "./Reports";
import Budgets from "./Budgets";
import History from "./History";

// for dashboard context
import { activeBudgetContext } from "../context/DashboardContext";

const Dashboard = () => {

    // for icons
    const DashboardIcon = BsFillHouseDoorFill as React.ComponentType<IconBaseProps>;
    const ReportIcon = BsFileEarmarkBarGraphFill as React.ComponentType<IconBaseProps>;
    const BudgetIcon = BsPiggyBankFill as React.ComponentType<IconBaseProps>;
    const HistoryIcon = BsArrowLeftRight as React.ComponentType<IconBaseProps>;
    const BackIcon = BsArrowBarLeft as React.ComponentType<IconBaseProps>;
    const SidebarIcon = BsArrowBarRight as React.ComponentType<IconBaseProps>;
    const PlusIcon = BsPlusLg as React.ComponentType<IconBaseProps>;

    const [activeView, setActiveView] = useState<string>("sub-dashboard");

    const navigate = useNavigate();

    // to set the active view checking the path on load
    const location = useLocation();
    useEffect(() => {
        // Extract the last part of the path (e.g. "reports" from "/dashboard/reports")
        const pathParts = location.pathname.split("/");
        const currentView = pathParts[pathParts.length - 1] || "sub-dashboard";
        setActiveView(currentView);
    }, [location.pathname]); // Runs whenever path changes

    // for context
    const [activeBudget, setActiveBudget] = useState<string>("all")

    // For responsiveness
    const screenSize = window.innerWidth
    const screenHeight = window.innerHeight
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false)
    // useEffect(() => {
    //     if (screenSize < 480) {
    //         alert("You're on a phone!");
    //     }
    // }, []);

    return (
        <activeBudgetContext.Provider value={{ activeBudget, setActiveBudget }}>
            <div id="Dashboard">
                <div id="side-menu" style={{left: screenSize < 768 ? isSidebarActive? '0%': '-85%' : '20px'}}>
                    {screenSize < 768 && <button onClick={()=> {setIsSidebarActive(!isSidebarActive)}}>
                        {!isSidebarActive ? <SidebarIcon
                            className="side-bar-icon"
                            size={25}
                            strokeWidth={0.5}
                            color="#4d69ff"
                        ></SidebarIcon> : <PlusIcon
                            className="side-bar-icon"
                            size={25}
                            strokeWidth={0.5}
                            color="#4d69ff"
                            style={{rotate: '45deg'}}
                        ></PlusIcon>}
                    </button>}
                    <div id="side-menu-title">ExTrack</div>
                    <div id="menu-options">
                        <div
                            className="menu-option"
                            id="dashboard-option"
                            onClick={() => {
                                navigate("/dashboard/sub-dashboard")
                                setActiveView("sub-dashboard");
                            }}
                            style={{
                                background:
                                    activeView === "sub-dashboard" ? "#cdd5ff" : "transparent",
                                fontWeight: activeView === "sub-dashboard" ? "600" : "",
                            }}
                        >
                            <DashboardIcon
                                className="menu-option-icon"
                                size={20}
                                color={activeView === "sub-dashboard" ? "white" : "#4d69ff"}
                                style={{
                                    background: activeView === "sub-dashboard" ? "#4d69ff" : "white",
                                }}
                            />
                            Dashboard
                        </div>
                        <div
                            className="menu-option"
                            id="resports-option"
                            onClick={() => {
                                navigate("/dashboard/reports")
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
                                navigate("/dashboard/budgets")
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
                            id="history-option"
                            onClick={() => {
                                navigate("/dashboard/history")
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
                        />&nbsp;
                        Back
                    </div>
                </div>

                <div id="View">
                    {/* <Router> // Not needed as already inside the router from the App.tsx*/}
                    <Routes>
                        <Route path="sub-dashboard" element={<SubDashboard />}></Route>
                        <Route path="reports" element={<Reports />}></Route>
                        <Route path="budgets" element={<Budgets />}></Route>
                        <Route path="history" element={<History />}></Route>
                    </Routes>
                    {/* </Router> */}
                </div>
            </div>
        </activeBudgetContext.Provider>
    );
};

export default Dashboard;
