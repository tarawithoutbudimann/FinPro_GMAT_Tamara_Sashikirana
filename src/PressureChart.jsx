import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { io } from "socket.io-client";
import 'tailwindcss/tailwind.css'; 

const PressureChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io("https://gmat.haikalhilmi.my.id/");

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("message", (mess) => {
      console.log(mess);
      const dataArray = mess.split(',');
      const Pressure = parseFloat(dataArray[8]);
      const Clock = dataArray[1]; // Use the provided clock data
      setData(prevData => [...prevData, { Pressure, Clock }]);
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
  const PressureData = data.map(item => item.Pressure);

  return (
    <Plot
      data={[
        { type: 'scatter', mode: 'lines', name: 'Pressure', x: xData, y: PressureData, marker: { color: 'blue' } },
      ]}
      layout={{ width: 450, height: 300, title: 'Graph Pressure' }}
    />
  );
};

export default PressureChart;
