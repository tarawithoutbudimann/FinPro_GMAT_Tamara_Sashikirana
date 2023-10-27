import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { io } from "socket.io-client";
import 'tailwindcss/tailwind.css'; 

const GyroscopeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io("https://gmat.haikalhilmi.my.id/");

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("message", (mess) => {
      console.log(mess);
      const dataArray = mess.split(',');
      const Yaw = parseFloat(dataArray[2]);
      const Pitch = parseFloat(dataArray[3]);
      const Roll = parseFloat(dataArray[4]);
      setData(prevData => [...prevData, { Yaw, Pitch, Roll }]);
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

  // Memisahkan data untuk visualisasi
  const xData = data.map((item, index) => index);
  const yawData = data.map(item => item.Yaw);
  const pitchData = data.map(item => item.Pitch);
  const rollData = data.map(item => item.Roll);

  return (
    <Plot
      data={[
        { type: 'scatter', mode: 'lines', name: 'Yaw', x: xData, y: yawData, marker: { color: 'red' } },
        { type: 'scatter', mode: 'lines', name: 'Pitch', x: xData, y: pitchData, marker: { color: 'green' } },
        { type: 'scatter', mode: 'lines', name: 'Roll', x: xData, y: rollData, marker: { color: 'blue' } },
      ]}
      layout={{ width: 750, height: 500, title: 'Gyroscope' }}
    />
  );
};

export default GyroscopeChart;
