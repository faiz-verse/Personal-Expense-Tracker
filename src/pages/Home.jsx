import React, { useState, useEffect } from 'react'

//for lottie animation
import Lottie from '@lottielab/lottie-player/react';

// import { Link } from 'react-router-dom'  //WAY 1
import { useNavigate } from 'react-router-dom'  //WAY 2

import './Home.css'

function Home() {

    // TO enable navigation WAY 2
    const navigate = useNavigate()

    return (
        <div id='home'>

            <div id='bg-animation'>
                    <Lottie src="https://cdn.lottielab.com/l/2auo55ZKMZsVyV.json" autoplay loop={false}/>
            </div>

            <div id='nav'>
                <div id='title'>
                    <img src="/up trend.svg" alt="logo" />
                    <span><span style={{ color: '#4d69ff' }}>Expense</span> Tracker</span>
                </div>
                {/* <div id='login-options'>
                    <span>Sign-up</span>
                    <button>Login</button>
                </div> */}
            </div>

            <div id="home-content">
                
                <div id='title'>
                    <div id='title-expense'>Expense</div>
                    <div id='title-tracker'>Tracker</div>
                </div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta ullam, repudiandae adipisci, pariatur obcaecati ex reiciendis expedita illo doloribus earum a dolore sit nostrum excepturi minima dolorum quod asperiores? Voluptatibus voluptatem reiciendis qui vitae possimus?</p>
                {/* <Link to='/dashboard'><button>Getting started</button></Link> */}
                <button onClick={() => navigate('/dashboard')}>Getting started</button>

            </div>
        </div>
    )
}

export default Home
