import React, { useEffect, useState } from 'react';
import { Creature } from '../data/oceanData';

interface SeaCreatureProps {
  creature: Creature;
  isVisible: boolean;
  currentDepth: number;
}

const SeaCreature: React.FC<SeaCreatureProps> = ({ 
  creature, 
  isVisible, 
  currentDepth 
}) => {
  const [position, setPosition] = useState({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 360
  });

  const [animationState, setAnimationState] = useState({
    direction: Math.random() > 0.5 ? 1 : -1,
    speed: 0.5 + Math.random() * 1.5,
    bobOffset: Math.random() * Math.PI * 2
  });

  useEffect(() => {
    if (!isVisible) return;

    const animate = () => {
      setPosition(prev => {
        const time = Date.now() * 0.001;
        const newX = prev.x + animationState.direction * animationState.speed;
        const bobY = Math.sin(time + animationState.bobOffset) * 20;
        
        // Wrap around screen
        let wrappedX = newX;
        if (newX > window.innerWidth + 100) wrappedX = -100;
        if (newX < -100) wrappedX = window.innerWidth + 100;

        return {
          x: wrappedX,
          y: prev.y + bobY * 0.1,
          rotation: prev.rotation + 0.5
        };
      });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [isVisible, animationState]);

  if (!isVisible) return null;

  return (
    <div
      className={`sea-creature ${creature.type} ${creature.size}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-in-out'
      }}
    >
      <div className="creature-sprite">
        <div className={`creature-body ${creature.id}`}>
          {creature.hasBioluminescence && currentDepth > 1000 && (
            <div className="bioluminescence" />
          )}
        </div>
        {creature.hasEyes && (
          <div className="creature-eyes">
            <div className="eye left" />
            <div className="eye right" />
          </div>
        )}
        {creature.hasTentacles && (
          <div className="tentacles">
            {Array.from({ length: creature.tentacleCount || 8 }).map((_, i) => (
              <div key={i} className={`tentacle tentacle-${i}`} />
            ))}
          </div>
        )}
      </div>
      
      <div className="creature-info">
        <div className="creature-name">{creature.name}</div>
        <div className="creature-depth">{creature.minDepth}-{creature.maxDepth}m</div>
      </div>
    </div>
  );
};

export default SeaCreature;