import React from 'react'
import './Navigation.css'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

function Navigation() {
  const user = localStorage.getItem("user")
  const dispatch = useDispatch()

  const handleClick = (e) => {
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
          <div className="user-dropdown">
            <div className="user-avatar"></div>
            <button type="button" onClick={handleClick}>Logout</button>
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
