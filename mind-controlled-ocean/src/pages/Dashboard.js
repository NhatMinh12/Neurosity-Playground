import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';
import {
  selectDevice
} from '../reducers/neurositySlice';

export function Dashboard() {
    const [brainData, setBrainData] = useState(null);
    const [getThatShit, setGetThatShit] = useState(false);

    const neurosity = useSelector(selectDevice);

    useEffect(() => {
        if (getThatShit && neurosity)
        {
            const brainwaveSub = neurosity.brainwaves("raw").subscribe((brainwaves) => {
                setBrainData(brainwaves);
                console.log(brainwaves);
            })

            return () => { brainwaveSub.unsubscribe() }

        }
    },[getThatShit])

    

    return (<><button onClick={() => setGetThatShit(!getThatShit)}>Get Brain data</button></>)
}