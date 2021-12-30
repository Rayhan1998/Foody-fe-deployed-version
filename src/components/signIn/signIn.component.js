import React, { useState, useContext, useEffect } from "react";
import "./signin.styles.css";
import Navbar from "../navbar/navbar.component";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

import { useNavigate, Link } from "react-router-dom";
import { Context } from "../../Context";
export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setIsLoggingIn] = useState("");
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserData,
    userData,
    setSavedRecipes
  } = useContext(Context);

  const navigate = useNavigate();

  const onEmailChange = e => {
    setEmail(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const onSubmitSignIn = e => {
    setIsLoggingIn("logging in");
    e.preventDefault();
    let login = {
      email: email,
      password: password
    };
    axios
      .post("https://immense-citadel-91247.herokuapp.com/signin", login)
      .then(res => {
        if (res.data.id) {
          navigate(-1);
          setIsLoggedIn(true);
          setIsLoggingIn("logged in");
          setUserData(res.data);
        }
      })
      .catch(err => {
        setIsLoggingIn("login error");
        alert("There was a problem logging you in");
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div class="sign-in">
      {loggingIn === "logging in" ? (
        <Spinner
          size="xl"
          w="50px"
          h="50px"
          position="absolute"
          top="49%"
          left="49%"
          zIndex="9999"
        />
      ) : null}
      <Navbar />
      <div className={loggingIn === "logging in" ? "overlay" : null}>
        <form className="form" onSubmit={onSubmitSignIn}>
          <div class="title">Welcome</div>
          <div class="subtitle">Sign in </div>
          <div class="input-container ic2">
            <input
              id="email"
              class="input"
              type="email"
              placeholder=" "
              onChange={onEmailChange}
              value={email}
            />
            <div class="cut cut-short"></div>
            <label for="email" class="placeholder">
              Email
            </label>
          </div>

          <div class="input-container ic2">
            <input
              id="password"
              class="input"
              type="password"
              placeholder=" "
              onChange={onPasswordChange}
              value={password}
              required
            />
            <div class="cut"></div>
            <label for="lastname" class="placeholder">
              password
            </label>
          </div>
          <button type="text" class="submit">
            submit
          </button>

          <button type="text" class="submit">
            <Link to="/register">Create New Account</Link>
          </button>
        </form>
      </div>
    </div>
  );
}
