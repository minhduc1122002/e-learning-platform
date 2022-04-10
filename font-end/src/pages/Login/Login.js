import React from "react";
import './Login.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'
import { login, reset } from '../../redux/authSlice'
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading, isError, message } = useSelector(
        (state) => state.auth
    )
    const dispatch = useDispatch();
    useEffect(() => {
        if (isError) {
            toast.error(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: () => dispatch(reset())
            })
        }
        toast.clearWaitingQueue();
    }, [isError, message, dispatch])
    const handleLogin = (e) => {
        if (!username || !password) {
            toast.error("All field is required", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: () => dispatch(reset())
            })
        }
        e.preventDefault()
        dispatch(login({username, password}));
    }
    return (
        <>
            <ToastContainer limit={1}/>
            <div className="login">
            <form className="form" method="get">   
                <div className="head">
                    <h1>Login</h1>
                </div>
                <div className="input">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="username"
                        name="username"
                        className="infor"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className="infor"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="forgot-account">
                    <a href ="/forgot">Forgot your password?</a>
                </div>
                <button className="press" type="submit" onClick={handleLogin} disabled={isLoading || isError}>Login</button>
                <div className="account">Don’t have an account yet? {' '} 
                    <Link to="/signup" className="signup">Sign Up</Link>
                </div>
            </form> 
        </div>
        </>
    );
}
