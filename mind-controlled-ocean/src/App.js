import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Calm } from "./pages/Calm";
import { Dashboard } from "./pages/Dashboard";
import { Neurosity } from "@neurosity/sdk";
import { useSelector, useDispatch } from 'react-redux';
import {
  setDeviceId,
  setDevice,
  setUser,
  setStatus,
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

    const authSubscription = neurosity.onAuthStateChanged().subscribe((userFromSub) => {
      dispatch(setUser(userFromSub));

      if (userFromSub === null) {
        navigate("/");
      }

      setLoading(false);
    });

    return () => {
      authSubscription.unsubscribe();
    };
  }, [neurosity]);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  // useEffect(() => {    
  //   if (user && neurosity){
  //     const brainwaveSub = neurosity.brainwaves("raw").subscribe((brainwaves) => {
  //         console.log(brainwaves);
  //     })

  //     return () => { brainwaveSub.unsubscribe() }
  //   }
     
  //   },[user])


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
          dispatch(setStatus(null));
        }}
      />} />

      <Route path="/home" element={<Dashboard />} />
    </Routes>
    </>
  );
}