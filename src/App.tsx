import React, { useEffect, useState, useRef } from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { oceanZones } from './data/oceanData';
import Hero from './components/Hero';
import DepthRuler from './components/DepthRuler';
import ParticleSystem from './components/ParticleSystem';
import SeaCreature from './components/SeaCreature';
import ZoneOverlay from './components/ZoneOverlay';
import SoundManager from './components/SoundManager';
import './styles/ocean.css';

function App() {
  const containerRef = useScrollAnimation();
  const [currentDepth, setCurrentDepth] = useState(0);
  const [currentZone, setCurrentZone] = useState(oceanZones[0]);
  const [visibleCreatures, setVisibleCreatures] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Start depth calculation after hero section
      const heroHeight = windowHeight;
      const oceanScrolled = Math.max(0, scrolled - heroHeight);
      const oceanHeight = documentHeight - heroHeight;
      
      // Calculate depth based on scroll position in ocean section only
      const maxDepth = 11000;
      const scrollPercentage = oceanScrolled / oceanHeight;
      const newDepth = Math.min(maxDepth, Math.max(0, scrollPercentage * maxDepth));
      setCurrentDepth(newDepth);

      // Determine current zone with smooth transitions
      let zone = oceanZones[0];
      for (let i = 0; i < oceanZones.length; i++) {
        if (newDepth >= oceanZones[i].depthStart && newDepth <= oceanZones[i].depthEnd) {
          zone = oceanZones[i];
          break;
        }
      }
      setCurrentZone(zone);

      // Update visible creatures based on depth with larger visibility range
      const creatures: string[] = [];
      oceanZones.forEach(z => {
        z.creatures.forEach(creature => {
          const creatureCenter = (creature.minDepth + creature.maxDepth) / 2;
          const visibilityRange = 2000; // Increased visibility range
          if (Math.abs(newDepth - creatureCenter) < visibilityRange) {
            creatures.push(creature.id);
          }
        });
      });
      setVisibleCreatures(creatures);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />
      
      {/* Ocean Exploration Container */}
      <div ref={containerRef} className="ocean-container">
        <DepthRuler currentDepth={currentDepth} />
        
        <ParticleSystem depth={currentDepth} zone={currentZone} />
        
        <SoundManager depth={currentDepth} />
        
        {/* Dynamic background layers with smooth transitions */}
        <div className="ocean-background">
          {oceanZones.map((zone, index) => (
            <div
              key={zone.id}
              className={`background-layer ${zone.id}`}
              style={{
                opacity: getZoneOpacity(currentDepth, zone),
                transform: `translateY(${getParallaxOffset(currentDepth, index)}px)`,
                transition: 'opacity 1s ease-in-out'
              }}
            />
          ))}
        </div>

        {/* Animated sea creatures */}
        <div className="creatures-container">
          {oceanZones.map(zone =>
            zone.creatures.map(creature => (
              <SeaCreature
                key={creature.id}
                creature={creature}
                isVisible={visibleCreatures.includes(creature.id)}
                currentDepth={currentDepth}
              />
            ))
          )}
        </div>

        {/* Zone information overlay */}
        <ZoneOverlay zone={currentZone} depth={currentDepth} />

        {/* Scrollable content sections - one for each zone */}
        {oceanZones.map((zone, index) => (
          <section
            key={zone.id}
            className="depth-section"
            style={{ 
              height: `${(zone.depthEnd - zone.depthStart) / 11000 * 500}vh`,
              background: `linear-gradient(180deg, ${getZoneGradient(zone)})`
            }}
            data-zone={zone.id}
          />
        ))}
      </div>
    </div>
  );
}

// Improved helper functions
function getZoneOpacity(currentDepth: number, zone: any): number {
  const buffer = 500; // Transition buffer zone
  
  if (currentDepth < zone.depthStart - buffer) return 0;
  if (currentDepth > zone.depthEnd + buffer) return 0;
  
  if (currentDepth >= zone.depthStart && currentDepth <= zone.depthEnd) {
    return 1;
  }
  
  // Fade in/out in buffer zones
  if (currentDepth < zone.depthStart) {
    return (currentDepth - (zone.depthStart - buffer)) / buffer;
  } else {
    return 1 - ((currentDepth - zone.depthEnd) / buffer);
  }
}

function getParallaxOffset(depth: number, layerIndex: number): number {
  return depth * 0.05 * (layerIndex + 1); // Reduced parallax for smoother effect
}

function getZoneGradient(zone: any): string {
  const gradients = {
    'sunlight': 'rgba(135, 206, 235, 0.1) 0%, rgba(70, 130, 180, 0.2) 100%',
    'twilight': 'rgba(0, 41, 82, 0.2) 0%, rgba(0, 15, 41, 0.4) 100%',
    'midnight': 'rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%',
    'abyssal': 'rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.95) 100%',
    'hadal': 'rgba(0, 0, 0, 0.95) 0%, rgba(26, 0, 51, 0.8) 50%, rgba(0, 0, 0, 1) 100%'
  };
  return gradients[zone.id as keyof typeof gradients] || 'transparent 0%, transparent 100%';
}

export default App;