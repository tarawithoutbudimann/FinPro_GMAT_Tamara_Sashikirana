import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { io } from "socket.io-client";

const RealTimeMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io("https://gmat.haikalhilmi.my.id/");

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("message", (mess) => {
      console.log(mess);
      const dataArray = mess.split(',');
      const latitude = parseFloat(dataArray[5]);
      const longitude = parseFloat(dataArray[6]);

      setData([{ latitude, longitude }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && mapRef.current.leafletElement) {
      const map = mapRef.current.leafletElement;
      const { latitude, longitude } = data[0] || {};

      if (latitude && longitude) {
        map.setView([latitude, longitude], map.getZoom());
      }
    }
  }, [data]);

  return (
    <div>
      {data.length > 0 ? (
        <MapContainer 
          center={[-7.765317, 110.371216]} 
          zoom={13} 
          style={{ height: '500px' }}
          whenCreated={map => mapRef.current = map}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
          {data.map((item, index) => (
            <Marker key={index} position={[item.latitude, item.longitude]}>
              <Popup>
                Siap Ke California <br />
                Latitude: {item.latitude}<br />
                Longitude: {item.longitude}<br />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default RealTimeMap;


