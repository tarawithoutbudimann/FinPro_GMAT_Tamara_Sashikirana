import React from 'react';
import RealTimeMap from './RealTimeMap';
import GyroscopeChart from './GyroscopeChart'; 
import VoltageChart from './VoltageChart'; 
import PressureChart from './PressureChart'; 
import AltitudeChart from './AltitudeChart';

function App() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <header class="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
        <div className="flex items-center space-x-4 text-white">
          <div className="flex flex-col items-end">
            <div className="text-md font-medium">Gadjah Mada Aerospace Team</div>
            <div className="text-sm font-regular">Tamara Sashikirana</div>
          </div>
          <div className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400"></div>
        </div>
      </header>
      <div className="h-screen w-full bg-gray-400">
        <div className="pb-5 w-full flex flex-wrap justify-center">
          <div className="w-1/2 flex justify-center p-3" id="map">
            <RealTimeMap />
          </div>
          <div className="w-1/2 flex h-[300px] justify-center p-3" id="chart-gyro">
            <GyroscopeChart />
          </div>
        </div>
        <div className="w-full flex py-2 flex-wrap justify-center bg-gray-400">
          <div className="w-1/3 px-2 flex justify-center" id="chart-voltage">
            <VoltageChart />
          </div>
          <div className="w-1/3 px-2 flex justify-center" id="chart-pressure">
            <PressureChart />
          </div>
          <div className="w-1/3 px-2 flex justify-center" id="chart-altitude">
            <AltitudeChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
