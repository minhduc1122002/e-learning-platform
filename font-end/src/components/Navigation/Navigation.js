import React from 'react'
import './Navigation.css'
function Navigation() {
  return (
    <div className="navigation">
        <div className="nav-links">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">Language Tracks</a></li>
            </ul>
        </div>
        <div className="nav-auth">
            <a className="sign-up" href="/Signup">Sign Up</a>
            <a className="log-in" href="/Login">Log In</a>
        </div>
    </div>
  )
}

export default Navigation
