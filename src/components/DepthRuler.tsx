import React, { useEffect, useState } from 'react';
import { Ruler, Thermometer, Gauge } from 'lucide-react';

interface DepthRulerProps {
  currentDepth: number;
}

const DepthRuler: React.FC<DepthRulerProps> = ({ currentDepth }) => {
  const [displayDepth, setDisplayDepth] = useState(0);
  const maxDepth = 11000;
  const rulerHeight = window.innerHeight * 0.5;
  
  // Ultra-smooth depth animation with higher precision
  useEffect(() => {
    const targetDepth = currentDepth;
    
    const animateDepth = () => {
      setDisplayDepth(prev => {
        const diff = targetDepth - prev;
        if (Math.abs(diff) < 0.1) return targetDepth;
        return prev + diff * 0.08; // Slower, smoother interpolation
      });
    };

    const interval = setInterval(animateDepth, 8); // Higher frequency for smoother animation
    return () => clearInterval(interval);
  }, [currentDepth]);

  // Generate precise depth markers
  const markers = [];
  for (let depth = 0; depth <= maxDepth; depth += 100) {
    const position = (depth / maxDepth) * rulerHeight;
    const isMajor = depth % 1000 === 0;
    const isMedium = depth % 500 === 0 && !isMajor;
    
    markers.push(
      <div
        key={depth}
        className="depth-marker"
        style={{ top: `${position}px` }}
      >
        {isMajor && (
          <>
            <div className="marker-line major-line" />
            <div className="marker-label">
              <span className="depth-meters">{(depth / 1000).toFixed(0)}km</span>
              <span className="depth-feet">{Math.round(depth * 3.28).toLocaleString()}ft</span>
            </div>
          </>
        )}
        {isMedium && !isMajor && (
          <>
            <div className="marker-line medium-line" />
            <div className="marker-label-small">
              <span className="depth-meters-small">{depth}m</span>
            </div>
          </>
        )}
        {!isMajor && !isMedium && <div className="marker-tick" />}
      </div>
    );
  }

  // Accurate environmental calculations
  const temperature = Math.max(1, 25 - (displayDepth / 1000) * 3.2);
  const pressure = 1 + (displayDepth / 10.33);

  // Get current zone with precise boundaries
  const getCurrentZone = () => {
    if (displayDepth < 200) return 'Sunlight Zone';
    if (displayDepth < 1000) return 'Twilight Zone';
    if (displayDepth < 4000) return 'Midnight Zone';
    if (displayDepth < 6000) return 'Abyssal Zone';
    return 'Hadal Zone';
  };

  const getDepthColor = () => {
    if (displayDepth < 200) return '#60a5fa'; // Blue
    if (displayDepth < 1000) return '#3b82f6'; // Darker blue
    if (displayDepth < 4000) return '#1e40af'; // Dark blue
    if (displayDepth < 6000) return '#6b7280'; // Gray
    return '#a855f7'; // Purple
  };

  return (
    <div className="depth-ruler">
      <div className="ruler-header">
        <Ruler className="ruler-icon" />
        <div className="current-depth">
          <div className="depth-display">
            <span 
              className="depth-value"
              style={{ color: getDepthColor() }}
            >
              {Math.round(displayDepth).toLocaleString()}
            </span>
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
              backgroundColor: getDepthColor(),
              boxShadow: `0 0 15px ${getDepthColor()}40`
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

      <div className="depth-progress">
        <div className="progress-label">Ocean Depth</div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              height: `${Math.min(100, (displayDepth / maxDepth) * 100)}%`,
              background: `linear-gradient(180deg, ${getDepthColor()} 0%, ${getDepthColor()}80 100%)`
            }}
          />
        </div>
        <div className="progress-labels">
          <span>0m</span>
          <span>11km</span>
        </div>
      </div>
    </div>
  );
};

export default DepthRuler;