import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { io } from "socket.io-client";
import 'tailwindcss/tailwind.css'; 

const AltitudeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io("https://gmat.haikalhilmi.my.id/");

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("message", (mess) => {
      console.log(mess);
      const dataArray = mess.split(',');
      const Altitude = parseFloat(dataArray[9]);
      const Clock = dataArray[1]; // Use the provided clock data
      setData(prevData => [...prevData, { Altitude, Clock }]);
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
  const AltitudeData = data.map(item => item.Altitude);

  return (
    <Plot
      data={[
        { type: 'scatter', mode: 'lines', name: 'Altitude', x: xData, y: AltitudeData, marker: { color: 'blue' } },
      ]}
      layout={{ width: 450, height: 300, title: 'Graph Altitude' }}
    />
  );
};

export default AltitudeChart;
