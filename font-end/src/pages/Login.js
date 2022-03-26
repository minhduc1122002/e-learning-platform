import React from "react";
import './Login.css';
 
export default function Login() {
      
    return (
        <div className="login">
            <form className="form" method="get">   
                <div className="head">
                    <h1>Login</h1>
                </div>
                <div className="input">
                    <label htmlFor="email">Email</label>
                    <input className="infor" type="email" placeholder="Enter your email address"></input>
                </div>
                <div className="input">
                    <label htmlFor="password">Password</label>
                    <input className="infor" type="password" placeholder="Enter your password"></input>
                </div>
                <div className="forgot-account">
                    <a href ="/forgot">Forgot your password?</a>
                </div>
                <button className="press" type="submit">Login</button>
                <div className="account">Don’t have an account yet? {' '} 
                    <a className = "signup" href ="/signup">Sign up</a>
                </div>
            </form> 
        </div>
    );
}
