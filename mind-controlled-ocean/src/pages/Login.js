
import React, { useState, useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import "./Login.css";

import { useSelector, useDispatch } from 'react-redux';
import {
  setDeviceId,
  selectDevice,
  selectUser,
} from '../reducers/neurositySlice';

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const neurosity = useSelector(selectDevice);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user && neurosity && email && password) {
        login();
    }

    async function login() {
        setIsLoggingIn(true);
        const auth = await neurosity.login({ email, password }).catch((error) => {
          setError(error.message);
        });

        // if (auth) {
        //   setUser(auth.user);
        // }

        setIsLoggingIn(false);
    }
  }, [email, password, neurosity, user, setError]);

  function onLogin({ email, password, deviceId }) {
    if (email && password && deviceId) {
      setError("");
      setEmail(email);
      setPassword(password);
      dispatch(setDeviceId(deviceId));
    } else {
      setError("Please fill the form");
    }
  }

  return (<div className="main"><LoginForm onLogin={onLogin} loading={isLoggingIn} error={error} /></div>);
}