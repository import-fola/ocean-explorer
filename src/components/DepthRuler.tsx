import React, { useEffect, useState } from 'react';
import { Ruler, Thermometer, Gauge } from 'lucide-react';

interface DepthRulerProps {
  currentDepth: number;
}

const DepthRuler: React.FC<DepthRulerProps> = ({ currentDepth }) => {
  const [displayDepth, setDisplayDepth] = useState(0);
  const maxDepth = 11000;
  const rulerHeight = window.innerHeight * 0.6;
  
  // Smooth depth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayDepth(prev => {
        const diff = currentDepth - prev;
        if (Math.abs(diff) < 1) return currentDepth;
        return prev + diff * 0.15; // Smooth interpolation
      });
    }, 16);

    return () => clearInterval(interval);
  }, [currentDepth]);

  // Generate consistent depth markers
  const markers = [];
  const markerIntervals = [
    { interval: 100, isMajor: false },
    { interval: 500, isMajor: false },
    { interval: 1000, isMajor: true }
  ];

  for (let depth = 0; depth <= maxDepth; depth += 100) {
    const position = (depth / maxDepth) * rulerHeight;
    const isMajor = depth % 1000 === 0;
    const isMinor = depth % 500 === 0 && !isMajor;
    
    if (depth % 100 === 0) {
      markers.push(
        <div
          key={depth}
          className={`depth-marker ${isMajor ? 'major' : isMinor ? 'medium' : 'minor'}`}
          style={{ top: `${position}px` }}
        >
          {isMajor && (
            <>
              <div className="marker-line major-line" />
              <div className="marker-label">
                <span className="depth-meters">{depth.toLocaleString()}m</span>
                <span className="depth-feet">{Math.round(depth * 3.28).toLocaleString()}ft</span>
              </div>
            </>
          )}
          {isMinor && !isMajor && (
            <>
              <div className="marker-line medium-line" />
              <div className="marker-label-small">
                <span className="depth-meters-small">{depth}m</span>
              </div>
            </>
          )}
          {!isMajor && !isMinor && <div className="marker-tick" />}
        </div>
      );
    }
  }

  // Calculate environmental data based on actual ocean science
  const temperature = Math.max(1, 25 - (displayDepth / 1000) * 3.5); // More realistic temp drop
  const pressure = 1 + (displayDepth / 10.33); // Accurate pressure calculation (1 ATM per 10.33m)

  // Get current zone for context
  const getCurrentZone = () => {
    if (displayDepth < 200) return 'Sunlight Zone';
    if (displayDepth < 1000) return 'Twilight Zone';
    if (displayDepth < 4000) return 'Midnight Zone';
    if (displayDepth < 6000) return 'Abyssal Zone';
    return 'Hadal Zone';
  };

  return (
    <div className="depth-ruler">
      <div className="ruler-header">
        <Ruler className="ruler-icon" />
        <div className="current-depth">
          <div className="depth-display">
            <span className="depth-value">{Math.round(displayDepth).toLocaleString()}</span>
            <span className="depth-unit">m</span>
          </div>
          <div className="depth-feet">
            {Math.round(displayDepth * 3.28).toLocaleString()} ft
          </div>
          <div className="current-zone">
            {getCurrentZone()}
          </div>
        </div>
      </div>

      <div className="ruler-scale">
        <div className="ruler-track">
          <div 
            className="depth-indicator"
            style={{ 
              top: `${Math.min(rulerHeight, (displayDepth / maxDepth) * rulerHeight)}px`,
              transition: 'top 0.3s ease-out'
            }}
          />
          <div className="ruler-background">
            {markers}
          </div>
        </div>
      </div>

      <div className="environmental-data">
        <div className="data-item">
          <Thermometer className="data-icon temp-icon" />
          <div className="data-value">
            <span className="data-number">{temperature.toFixed(1)}°C</span>
            <span className="data-label">Temperature</span>
          </div>
        </div>
        <div className="data-item">
          <Gauge className="data-icon pressure-icon" />
          <div className="data-value">
            <span className="data-number">{pressure.toFixed(1)}</span>
            <span className="data-label">Atmospheres</span>
          </div>
        </div>
      </div>

      {/* Depth progress bar */}
      <div className="depth-progress">
        <div className="progress-label">Ocean Depth</div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              height: `${Math.min(100, (displayDepth / maxDepth) * 100)}%`,
              transition: 'height 0.3s ease-out'
            }}
          />
        </div>
        <div className="progress-labels">
          <span>0m</span>
          <span>11,000m</span>
        </div>
      </div>
    </div>
  );
};

export default DepthRuler;