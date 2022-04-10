import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { register, reset } from "../../redux/authSlice";
import { toast, ToastContainer } from 'react-toastify'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

function Signup() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoading, isError, message } = useSelector(
    (state) => state.auth
)
  const dispatch = useDispatch();
  useEffect(() => {
      if (isError) {
          toast.error("Your Username or Email has been taken", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              onClose: () => dispatch(reset())
          });
      }
      toast.clearWaitingQueue();
  }, [isError, message, dispatch])

  const onSignUpClick = (e) => {
      e.preventDefault()
      if (!password || !username || !fullname || !email || !confirmPassword) {
        return toast.error("All field is required", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
      if (password.length < 8) {
        return toast.error("Password must be at least 8 characters", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
      if (password === confirmPassword) {
        dispatch(register({fullname, email, username, password}))
      }
      else {
        toast.error("Password confirmation doesn't match Password", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
  };

  return (
    <div className="signup-content">
      <ToastContainer limit={1}/>
      <form className="signup-form">
        <div className="header-signup">
          <h1>Signup</h1>
        </div>

        <div className="signup-form-inputs">
          <label htmlFor="fullname" className="label-signup">
            <strong>FULLNAME</strong>
          </label>
          <input
            id="fullname"
            type="fullname"
            name="fullname"
            className="input-signup"
            placeholder="Fullname"
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div className="signup-form-inputs">
          <label htmlFor="username" className="label-signup">
            <strong>USERNAME</strong>
          </label>
          <input
            id="username"
            type="username"
            name="username"
            className="input-signup"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="signup-form-inputs">
          <label htmlFor="email" className="label-signup">
            <strong>EMAIL</strong>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="input-signup"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="signup-form-inputs">
          <label htmlFor="password" className="label-signup">
            <strong>PASSWORD</strong>
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="input-signup"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="signup-form-inputs">
          <label htmlFor="confirm-password" className="label-signup">
            <strong>CONFIRM PASSWORD</strong>
          </label>
          <input
            id="confirm-password"
            type="password"
            name="password"
            className="input-signup"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="signup-input-btn"
          type="submit"
          onClick={onSignUpClick}
          disabled={isLoading}
        >
          <strong>Sign up</strong>
        </button>
        <span className="signup-input-login">
          Already have an account? <Link to="/login" className="signup-option-login">Login</Link>
        </span>
      </form>
    </div>
  );
}

export default Signup;
