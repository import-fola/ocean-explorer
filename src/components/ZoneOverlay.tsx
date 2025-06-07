import React from 'react';
import { OceanZone } from '../data/oceanData';

interface ZoneOverlayProps {
  zone: OceanZone;
  depth: number;
}

const ZoneOverlay: React.FC<ZoneOverlayProps> = ({ zone, depth }) => {
  return (
    <div className="zone-overlay">
      <div className="zone-info">
        <h2 className="zone-name">{zone.name}</h2>
        <p className="zone-description">{zone.description}</p>
        <div className="zone-stats">
          <span className="stat">
            <strong>Depth:</strong> {zone.depthStart}-{zone.depthEnd}m
          </span>
          <span className="stat">
            <strong>Light:</strong> {zone.lightLevel}
          </span>
          <span className="stat">
            <strong>Pressure:</strong> {zone.pressure}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ZoneOverlay;