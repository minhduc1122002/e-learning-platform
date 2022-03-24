import React from "react";
import './Login.css';
 
    export default function Login() {
      
    return (
        <div className="login">
        <form className="form" method="get">   
        <div className="head">
            <h1>Login</h1>
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input className="infor" type="email"></input>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input className="infor" type="password"></input>
        </div>
        <button className="press" type="submit">Login</button>
        <div className="account">Need an account? {' '} 
        <a className = "signup" href ="/Signup">Sign up</a></div>
        </form> 
        </div>
    );
    }
