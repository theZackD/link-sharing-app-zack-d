import LogoLarge from "./assets/images/Temp-logo-large.svg";
// import EmailIcon from './assets/images/icon-email.svg'
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "./AuthContext";

import "./Login.css";
import "./components.css";
import { useRef } from "react";

const linkStyle = {
  textDecoration: "none",
  color: "#633CFF",
};

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const { login, currentUser } = useAuth();
  const [error, setError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passError, setPassError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (emailRef.current?.value == "") {
      return setEmailError(`Can't be empty`);
    }

    if (
      passRef.current?.value.length != undefined &&
      passRef.current?.value.length < 8
    ) {
      setEmailError("");
      return setPassError("Please check again");
    }

    try {
      setEmailError("");
      setPassError("");
      setError("");
      setLoading(true);
      await login(emailRef.current?.value, passRef.current?.value);
      navigate("/dashboard");
    } catch {
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <div className="head">
        <img src={LogoLarge} alt="" />
      </div>
      <div className="Log-container">
        <div className="title">
          <h2>Login</h2>
          <p> {currentUser && currentUser.email} </p>
          <p id="description">
            Add your details below to get back into the app
          </p>
        </div>
        <form action="#" onSubmit={handleSubmit}>
          <label htmlFor="Email">Email address</label>
          <input
            className="email"
            type="text"
            name="Email"
            placeholder={`e.g.: alex@email.com`}
            ref={emailRef}
          />
          <p className="error"> {emailError} </p>
          <label htmlFor="Password">Password</label>
          <input
            className="password"
            type="password"
            name="Password"
            placeholder={"Enter your password"}
            ref={passRef}
          />
          <p className="error"> {passError} </p>
          <p className="error-failed"> {error} </p>
          <button disabled={loading} className="btn-1" type="submit">
            Login
          </button>
        </form>
        <p id="createacc">
          Don't have an account ?{" "}
          <Link to="/signup" style={linkStyle}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
