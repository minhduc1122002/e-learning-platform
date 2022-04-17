import React, { useState } from 'react'
import './Navigation.css'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

function Navigation() {
  const user = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()

  const [isActive, setIsActive] = useState(false)

  const handleLogout = (e) => {
    e.preventDefault()
    setIsActive(false)
    dispatch(logout())
  }

  return (
    <div className="navigation">
        <div className="nav-links">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/courses">Language Tracks</a></li>
            </ul>
        </div>
        {user ? (
          <div className="user-section" onClick={(e) => setIsActive(!isActive)}>
            <div className="user-avatar" style={{backgroundImage: `url('${user.profileImage}')`}}></div>
            <img alt="Profile Menu" className="dropdown-icon" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/icons/more-vertical-371ef6f2314bb5dbe5d3892a7ee098c6ebc3cf30.svg"></img>
          </div>
        ) : (
          <div className="nav-auth">
              <a href="/signup" className="sign-up">Sign Up</a>
              <a href="/login" className="log-in">Login</a>
          </div>
        )}
        {isActive && (
          <div className="user-menu-dropdown">
              <ul>
                <li class="profile" tabindex="-1" role="menuitem">
                  <a href={`/profiles/${user._id}`}>
                    <div className="user-avatar" style={{backgroundImage: `url('${user.profileImage}')`}}></div>
                    <div class="info"><div class="name">{user.fullname}</div><div class="handle">@{user.username}</div></div>
                  </a>
                </li>
                <li><a href={`/profiles/${user._id}`}>Public Profile</a></li>
                <li><a href="/settings">Settings</a></li>
                <li><div className='sign-out' onClick={handleLogout}>Sign out</div></li>
              </ul>
          </div>
        )}
    </div>
  )
}

export default Navigation
