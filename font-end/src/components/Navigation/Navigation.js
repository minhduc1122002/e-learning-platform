import React from 'react'
import './Navigation.css'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

function Navigation() {
  const user = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <div className="navigation">
        <div className="nav-links">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">Language Tracks</a></li>
            </ul>
        </div>
        {user ? (
          <div className="user-section" onClick={handleLogout}>
            <div className="user-avatar"></div>
            <img alt="Profile Menu" className="dropdown-icon" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/icons/more-vertical-371ef6f2314bb5dbe5d3892a7ee098c6ebc3cf30.svg"></img>
          </div>
        ) : (
        <div className="nav-auth">
            <a href="/signup" className="sign-up">Sign Up</a>
            <a href="/login" className="log-in">Login</a>
        </div>)}
    </div>
  )
}

export default Navigation
