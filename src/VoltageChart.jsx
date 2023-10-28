import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { io } from "socket.io-client";
import 'tailwindcss/tailwind.css'; 

const VoltageChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io("https://gmat.haikalhilmi.my.id/");

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("message", (mess) => {
      console.log(mess);
      const dataArray = mess.split(',');
      const Voltage = parseFloat(dataArray[7]);
      const Clock = dataArray[1]; // Use the provided clock data
      setData(prevData => [...prevData, { Voltage, Clock }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        if (prevData.length > 5) {
          return prevData.slice(-10); // Keep only the last 10 data points
        }
        return prevData;
      });
    }, 1000); // Run every second

    return () => clearInterval(interval);
  }, []);

  // Separate data for visualization
  const xData = data.map(item => item.Clock);
  const VoltageData = data.map(item => item.Voltage);

  return (
    <Plot
      data={[
        { type: 'scatter', mode: 'lines', name: 'Voltage', x: xData, y: VoltageData, marker: { color: 'blue' } },
      ]}
      layout={{ width: 450, height: 300, title: 'Graph Voltage' }}
    />
  );
};

export default VoltageChart;



// import React, { useState, useEffect } from 'react';
// import Plot from 'react-plotly.js';
// import { io } from "socket.io-client";
// import 'tailwindcss/tailwind.css'; 

// const VoltageChart = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const socket = io("https://gmat.haikalhilmi.my.id/");

//     socket.on("connect", () => {
//       console.log("Connected to Socket.IO server");
//     });

//     socket.on("message", (mess) => {
//       console.log(mess);
//       const dataArray = mess.split(',');
//       const Voltage = parseFloat(dataArray[7]);
//       const Clock = new Date().toLocaleTimeString(); // Menggunakan waktu sekarang
//       setData(prevData => [...prevData, { Voltage, Clock }]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setData(prevData => {
//         if (prevData.length > 5) {
//           return prevData.slice(-10); // Keep only the last 10 data points
//         }
//         return prevData;
//       });
//     }, 1000); // Run every second

//     return () => clearInterval(interval);
//   }, []);

//   // Memisahkan data untuk visualisasi
//   const xData = data.map(item => item.Clock);
//   const VoltageData = data.map(item => item.Voltage);

//   return (
//     <Plot
//       data={[
//         { type: 'scatter', mode: 'lines', name: 'Voltage', x: xData, y: VoltageData, marker: { color: 'blue' } },
//       ]}
//       layout={{ width: 700, height: 400, title: 'Graph 0' }}
//     />
//   );
// };

// export default VoltageChart;


