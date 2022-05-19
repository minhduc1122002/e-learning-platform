import React, { useState } from 'react'
import './Navigation.css'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useEffect } from 'react'
import decode from 'jwt-decode';

function Navigation() {
  const user = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()

  const checkExpired = () => {
    const token = JSON.parse(localStorage.getItem('accessToken'))
    if (token) {
      const decodedToken = decode(token);
  
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout())
        console.log("hi from expired")
      }
    }
  }
  useEffect(() => {
    setInterval(() => {
      checkExpired()
    }, 5000)
  }, []);

  const [isActive, setIsActive] = useState(false)
  const [isMenu, setIsMenu] = useState(false)

  const handleLogout = (e) => {
    e.preventDefault()
    setIsActive(false)
    dispatch(logout())
  }
  const handleBlur = (e) => {
    if (e.nativeEvent.explicitOriginalTarget &&
        e.nativeEvent.explicitOriginalTarget === e.nativeEvent.originalTarget) {
        return;
    }

    if (isActive) {
      setTimeout(() => {
        setIsActive(false)
      }, 2000);
    }
  }
  return (
    <div className="navigation">
        <div className="nav-links">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/courses">Language Tracks</a></li>
                <li><a href="/blogs">Blogs</a></li>
            </ul>
        </div>
        <div className='nav-btn' tabIndex={ 0 } onClick={() => setIsMenu(!isMenu)}>
          <img alt="Profile Menu" className="dropdown-icon" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/icons/more-vertical-371ef6f2314bb5dbe5d3892a7ee098c6ebc3cf30.svg"></img>
        </div>
        { isMenu && 
          <div className='user-menu-dropdown'>
              <ul>
                <li className='compact'><a href="/">Home</a></li>
                <li className='compact'><a href="/blogs">Blogs</a></li>
                <li className='compact'><a href="/courses">Language Tracks</a></li>
              </ul>
          </div>
        }
        {user ? (
          <div className="user-section" tabIndex={ 0 } onClick={() => setIsActive(!isActive)} onBlur={handleBlur}>
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
                <li className="profile" tabIndex="-1" role="menuitem">
                  <a href={`/profiles/${user._id}`}>
                    <div className="user-avatar" style={{backgroundImage: `url('${user.profileImage}')`}}></div>
                    <div className="info"><div className="name">{user.fullname}</div><div className="handle">@{user.username}</div></div>
                  </a>
                </li>
                <li><a href="/newblog">Create a Blog</a></li>
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
