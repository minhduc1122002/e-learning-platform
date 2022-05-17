import React from "react";
import './Login.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'
import { login, reset, google } from '../../redux/authSlice'
import { GoogleLogin } from 'react-google-login'
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isMissing, setIsMissing] = useState(false)
    const isLoading = useSelector(
        (state) => state.auth.isLoading[1]
    )
    const message = useSelector(
        (state) => state.auth.message
    )
    const isError = useSelector(
        (state) => state.auth.isError[1]
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
        e.preventDefault()
        if (!username || !password) {
            setIsMissing(true)
            return toast.error("All field is required", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: () => setIsMissing(false)
            })
        } else {
            dispatch(login({username, password}));
        }
    }
    const successGoogle = (res) => {
        dispatch(google({tokenId: res.tokenId}))
    }
    const errorGoogle = (res) => {
        toast.error(res.details, {
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
    return (
        <>
            <ToastContainer limit={1}/>
            <div className="login">
            <form className="form">   
                <div className="head">
                    <h1>Login</h1>
                </div>
                <GoogleLogin
                    clientId="6121299943-jiqf0v9olgtvhck1qg0sjo2p1k8fp2ms.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={successGoogle}
                    onFailure={errorGoogle}
                    cookiePolicy={'single_host_origin'}
                    className="middle-auth"
                />
                <div className="divider">
                    <span>or</span>
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
                <button className="press" type="submit" onClick={handleLogin} disabled={isLoading || isError || isMissing}>Login</button>
                <div className="account">Don’t have an account yet? {' '} 
                    <Link to="/signup" className="signup">Sign Up</Link>
                </div>
            </form> 
        </div>
        </>
    );
}
