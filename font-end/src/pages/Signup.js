import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignUpClick = (e) => {
    e.preventDefault();
    console.log({ email, password, confirmPassword });
  };

  return (
    <div className="signup-content">
      <form className="signup-form">
        <div className="header-signup">
          <h1>Sign up</h1>
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
        >
          <strong>SIGN UP</strong>
        </button>
        <span className="signup-input-login">
          Already have an account? <a href="/Login">Login here</a>
        </span>
      </form>
    </div>
  );
}

export default Signup;
