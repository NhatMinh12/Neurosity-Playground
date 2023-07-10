// import React, { useState, useEffect } from "react";
// import { Nav } from "../components/Nav";

// export function Calm () {
//   const [calm, setCalm] = useState(0);
//   const [status, setStatus] = useState(null);
//   const { state, charging, battery, sleepMode } = status || {};

//   useEffect(() => {
//     if (!user || !neurosity) {
//       return;
//     }

//     const statusSub = neurosity.status().subscribe((status) => {
//       setStatus(status);
//     });

//     return () => {
//       statusSub.unsubscribe();
//     };
//   }, [user, neurosity]);

//   useEffect(() => {
//     if (state && state !== "offline")
//     {
//         const subscription = neurosity.calm().subscribe((calm) => {
//             setCalm(Number(calm.probability.toFixed(2)));
//         });

//       return () => {
//         subscription.unsubscribe();
//     };
//     }
//   }, [state])

//   return (
//     <main className="main-container">
//       {user ? <Nav neurosity={neurosity} /> : null}
//       <div className="calm-score">
//         &nbsp;{calm * 100}% <div className="calm-word">Calm</div>
//       </div>
//     </main>
//   );
// }