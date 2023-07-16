import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';
import {
  selectDevice
} from '../reducers/neurositySlice';
import { CSVLink } from "react-csv";

export function Dashboard() {
    const headers = [
      'CP3', 'C3',
      'F5',  'PO3',
      'PO4', 'F6',
      'C4',  'CP4'
    ];
    const [brainData, setBrainData] = useState([headers]);
    const [getThatShit, setGetThatShit] = useState(false);
    const [makeCSVAppear, setmakeCSVAppear] = useState(false);

    const neurosity = useSelector(selectDevice);

    const reformatDimension = (brainwaves,sampleIndex) => {
        const dataForEveryChannel = [];
        for (let i = 0; i<8; i++) {
            dataForEveryChannel.push(brainwaves.data[i][sampleIndex].toString())
        }
        return dataForEveryChannel;
    }

    useEffect(() => {
        let brainwaveSub = null;
        if (getThatShit && neurosity)
        {
            brainwaveSub = neurosity.brainwaves("raw").subscribe((brainwaves) => {
                const currentSample = brainData;
                for (let i = 0; i<16; i++) {
                    currentSample.push(reformatDimension(brainwaves,i));
                }
                setBrainData(currentSample);
                console.log(brainData);
            })
        }
        if (brainwaveSub) return () => { brainwaveSub.unsubscribe() }
    },[getThatShit])

    

    return (<>
    <button onClick={() => setGetThatShit(!getThatShit)}>
        Get Brain data
    </button>
    { makeCSVAppear && <CSVLink
        data={brainData}
        filename={"brainFile.csv"}
        onClick={() => {console.log("This is what bd is:",brainData)}}
        >
        Download me
    </CSVLink>}
    <button onClick={() => setBrainData([headers])}>
        Clear Brain Data
    </button>
    <button onClick={() => setmakeCSVAppear(!makeCSVAppear)}>
        Allow CSV Download
    </button>
    </>)
}