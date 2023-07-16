import "./Header.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Status } from "./Status";

import { useSelector, useDispatch } from 'react-redux';
import {
  selectDevice,
  selectUser,
  selectStatus,
  setStatus,
} from '../reducers/neurositySlice';

function Header () {
    // check fot login
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const neurosity = useSelector(selectDevice);
    const user = useSelector(selectUser);
    const status = useSelector(selectStatus)

    const [signalQuality, setSignalQuality] = useState();

    useEffect(() => {
        if (!user || !neurosity) {
            return;
        }

        const statusSub = neurosity.status().subscribe((status) => {
            dispatch(setStatus(status));
        });

        return () => {
            statusSub.unsubscribe();
        };
    }, [user, neurosity]);

    useEffect(() => {
        if(!status || !neurosity || status.state !== "online"){
            return;
        }
        const signalQualitySubscription = neurosity.signalQuality().subscribe((signal) => {
            setSignalQuality(signal);
            console.log(signal);
        });
        return () => {
            signalQualitySubscription.unsubscribe();
        };
    }, [status])

    return (
        <div className="headerContainer">
            <div style={{display: "flex", flexDirection: "row"}}>
                <Status status={status} />
                <p>Imagine Software Neurosity Webapp</p>
                <button onClick={() => navigate("/")}>
                    Login
                </button>
                <button onClick={() => navigate("/logout")}>
                    Logout
                </button>
            </div>
            {
                (signalQuality)?signalQuality.map(function(val, i){
                    return (<>Ch {i + 1}: {val['status']} </>)
                }):<></>
            }
        </div>
    )
}

export default Header;