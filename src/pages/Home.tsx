import React, { useState } from "react";

// for lottie animation
import Lottie from "@lottielab/lottie-player/react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

const Home: React.FC = () => {

  const [showHelper, setShowHelper] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleMouseEnter = () => setShowHelper(true);
  const handleMouseLeave = () => setShowHelper(false);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div id="home">
      <div id="bg-animation">
        <Lottie
          src="https://cdn.lottielab.com/l/2auo55ZKMZsVyV.json"
          autoplay
          loop={false}
        />
      </div>

      <div id="nav">
        <div id="title">
          <img src="/up trend.svg" alt="logo" />
          <span>
            <span style={{ color: "#4d69ff" }}>Ex</span> Track
          </span>
        </div>
      </div>

      <div id="home-content">
        <div id="title">
          <div
            id="title-expense"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            Ex
          </div>
          <div
            id="title-tracker"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            Track
          </div>

          {showHelper && (
            <div
              id="title-helper"
              style={{
                position: "fixed",
                top: `${position.y + 15}px`,
                left: `${position.x + 15}px`,
                pointerEvents: "none",
                background: "rgba(255, 255, 255, 0.9)",
                padding: "8px 12px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                zIndex: 9999,
              }}
            >
              Personal Expense Tracker
            </div>
          )}
        </div>

        <p>Track your spending easily by recording daily expenses and setting custom budgets. Stay organized, monitor your balance, and gain insights to manage your finances better.</p>
        <button onClick={() => navigate("/dashboard/sub-dashboard")}>Getting started</button>
      </div>
    </div>
  );
};

export default Home;
