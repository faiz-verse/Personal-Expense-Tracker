import React, { useState } from "react";

// for lottie animation
// import Lottie from "@lottielab/lottie-player/react";
// import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div id="Dashboard">
            <div id="side menu">
                <div id="side-menu-title">ExTrack</div>
                <div id="menu-options">
                    <div className="menu-option" id="dashboard-option">
                        Dashboard
                    </div>
                    <div className="menu-option" id="resports-option">
                        Reports
                    </div>
                    <div className="menu-option" id="budgets-option">
                        Budgets
                    </div>
                    <div className="menu-option" id="profile-option">
                        Transaction History
                    </div>
                </div>
                <div id="menu-footer">User Name</div>
            </div>
        </div>
    );
};

export default Dashboard;
