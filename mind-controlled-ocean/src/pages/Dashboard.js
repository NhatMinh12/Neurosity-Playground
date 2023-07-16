import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';
import {
  selectDevice
} from '../reducers/neurositySlice';
import { CSVLink } from "react-csv";

export function Dashboard() {
    const [brainData, setBrainData] = useState([['CH1','CH1','CH1','CH1','CH1','CH1','CH1','CH1']]);
    const [getThatShit, setGetThatShit] = useState(false);

    const neurosity = useSelector(selectDevice);

    const reformatDimension = (brainwaves,sampleIndex) => {
        const dataForEveryChannel = [];
        for (let i = 0; i<8; i++) {
            dataForEveryChannel.push(brainwaves.data[i][sampleIndex].toString())
        }
        return dataForEveryChannel;
    }

    useEffect(() => {
        if (getThatShit && neurosity)
        {
            const brainwaveSub = neurosity.brainwaves("raw").subscribe((brainwaves) => {
                const currentSample = brainData;
                for (let i = 0; i<16; i++) {
                    currentSample.push(reformatDimension(brainwaves,i));
                }
                setBrainData(currentSample);
                console.log(brainData);
            })
            return () => { brainwaveSub.unsubscribe() }
        }
        else {
            setBrainData([]);
        }
    },[getThatShit])

    

    return (<><button onClick={() => setGetThatShit(!getThatShit)}>Get Brain data</button><CSVLink
        data={brainData}
        filename={"brainFile.csv"}
        >
        Download me
        </CSVLink></>)
}