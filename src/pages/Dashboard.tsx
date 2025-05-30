import React, { useState } from "react";

import { IconBaseProps } from "react-icons";
import { BsFillHouseDoorFill, BsFileEarmarkBarGraphFill, BsPiggyBankFill, BsArrowLeftRight , BsArrowBarLeft} from "react-icons/bs";

// import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = () => {

    const DashboardIcon = BsFillHouseDoorFill as React.ComponentType<IconBaseProps>;
    const ReportIcon = BsFileEarmarkBarGraphFill as React.ComponentType<IconBaseProps>;
    const BudgetIcon = BsPiggyBankFill as React.ComponentType<IconBaseProps>;
    const HistoryIcon = BsArrowLeftRight as React.ComponentType<IconBaseProps>;
    const BackIcon = BsArrowBarLeft as React.ComponentType<IconBaseProps>;

    return (
        <div id="Dashboard">
            <div id="side-menu">
                <div id="side-menu-title">ExTrack</div>
                <div id="menu-options">
                    <div className="menu-option" id="dashboard-option">
                        <DashboardIcon className="menu-option-icon" size={20} color='#4d69ff'
                            style={{background: 'white'}}
                        />Dashboard
                    </div>
                    <div className="menu-option" id="resports-option">
                        <ReportIcon className="menu-option-icon" size={20} color='#4d69ff'
                            style={{background: 'white'}}
                        />Reports
                    </div>
                    <div className="menu-option" id="budgets-option">
                        <BudgetIcon className="menu-option-icon" size={20} color='#4d69ff'
                            style={{background: 'white'}}
                        />Budgets
                    </div>
                    <div className="menu-option" id="profile-option">
                        <HistoryIcon className="menu-option-icon" size={20} strokeWidth={0.5} color='#4d69ff'
                            style={{background: 'white'}}
                        />Transaction History
                    </div>
                </div>
                <div id="menu-footer">
                    <BackIcon className="back-icon" size={20} strokeWidth={0.5} color='#4d69ff'/> User Name
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
