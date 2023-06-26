import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Neurosity } from "@neurosity/sdk";

export default function App() {
  const [neurosity, setNeurosity] = useState(null);
  const [user, setUser] = useState(null);
  const [deviceId, setDeviceId] = useLocalStorage("deviceId");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (deviceId) {
      const neurosity = new Neurosity({ deviceId });
      setNeurosity(neurosity);
    } else {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    if (!neurosity) {
      return;
    }

    const subscription = neurosity.onAuthStateChanged().subscribe((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/");
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [neurosity]);

  return (
    <Routes>
      <Route path="/" element={
      <Login
        neurosity={neurosity}
        user={user}
        setUser={setUser}
        setDeviceId={setDeviceId}
      />} /> 

      <Route path="/logout" element={
      <Logout
        neurosity={neurosity}
        resetState={() => {
          setNeurosity(null);
          setUser(null);
          setDeviceId("");
        }}
      />}  />
    </Routes>
  );
}