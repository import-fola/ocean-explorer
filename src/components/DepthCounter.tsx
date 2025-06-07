import React, { useEffect, useState } from 'react';
import { Gauge, Thermometer, Activity } from 'lucide-react';

interface DepthCounterProps {
  currentDepth: number;
  maxDepth: number;
}

const DepthCounter: React.FC<DepthCounterProps> = ({ currentDepth, maxDepth }) => {
  const [displayDepth, setDisplayDepth] = useState(0);
  const [temperature, setTemperature] = useState(25);
  const [pressure, setPressure] = useState(1);

  useEffect(() => {
    // Animate depth counter
    const interval = setInterval(() => {
      setDisplayDepth(prev => {
        const diff = currentDepth - prev;
        if (Math.abs(diff) < 1) return currentDepth;
        return prev + diff * 0.1;
      });
    }, 16);

    // Calculate temperature (decreases with depth)
    const tempRange = 25; // Surface temp
    const newTemp = Math.max(1, tempRange - (currentDepth / 1000) * 4);
    setTemperature(newTemp);

    // Calculate pressure (increases with depth)
    const newPressure = Math.max(1, 1 + (currentDepth / 10));
    setPressure(newPressure);

    return () => clearInterval(interval);
  }, [currentDepth]);

  const getDepthColor = () => {
    const percentage = currentDepth / maxDepth;
    if (percentage < 0.1) return 'text-blue-400';
    if (percentage < 0.3) return 'text-blue-600';
    if (percentage < 0.6) return 'text-blue-800';
    if (percentage < 0.8) return 'text-gray-400';
    return 'text-purple-400';
  };

  return (
    <div 
      className="fixed top-4 right-4 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg z-50 min-w-[200px]"
      role="complementary"
      aria-label="Ocean depth information"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          <div>
            <div className={`text-2xl font-bold ${getDepthColor()}`}>
              {Math.round(displayDepth)}m
            </div>
            <div className="text-xs text-gray-300">Depth</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-red-400" />
          <div>
            <div className="text-lg font-semibold text-red-400">
              {temperature.toFixed(1)}°C
            </div>
            <div className="text-xs text-gray-300">Temperature</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-yellow-400" />
          <div>
            <div className="text-lg font-semibold text-yellow-400">
              {pressure.toFixed(1)} ATM
            </div>
            <div className="text-xs text-gray-300">Pressure</div>
          </div>
        </div>

        <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 via-blue-800 to-purple-600 transition-all duration-300"
            style={{ width: `${Math.min(100, (currentDepth / maxDepth) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default DepthCounter;