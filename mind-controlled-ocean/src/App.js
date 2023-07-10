import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Calm } from "./pages/Calm";
import { Neurosity } from "@neurosity/sdk";
import { useSelector, useDispatch } from 'react-redux';
import {
  setDeviceId,
  setDevice,
  setUser,
  selectDevice,
  selectUser,
  selectDeviceId,
} from './reducers/neurositySlice';

import Header from "./components/Header";
import './global.css'

export default function App() {
  const neurosity = useSelector(selectDevice);
  const user = useSelector(selectUser);
  const deviceId = useSelector(selectDeviceId);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (deviceId) {
      const neurosityInstance = new Neurosity({ deviceId });
      dispatch(setDevice(neurosityInstance));
    } else {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    if (!neurosity) {
      return;
    }

    const subscription = neurosity.onAuthStateChanged().subscribe((userFromSub) => {
      dispatch(setUser(userFromSub));

      if (userFromSub === null) {
        navigate("/");
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [neurosity]);

  useEffect(() => {
    if (user) {
      // navigate("/calm");
    }
  }, [user]);

  return (<>
    <Header />
    <Routes>
      <Route path="/" element={<Login/>} /> 

      <Route path="/logout" element={
      <Logout
        neurosity={neurosity}
        resetState={() => {
          dispatch(setDevice(null));
          dispatch(setUser(null));
          dispatch(setDeviceId(null));
        }}
      />} />

      {/* <Route path="/calm" element={<Calm />} /> */}
    </Routes>
    </>
  );
}