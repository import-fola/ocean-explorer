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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hero section height
      const heroHeight = windowHeight;
      
      // Only calculate ocean depth after hero section
      if (scrolled <= heroHeight) {
        setCurrentDepth(0);
        setScrollProgress(0);
        setCurrentZone(oceanZones[0]);
        return;
      }
      
      // Ocean section calculations
      const oceanScrolled = scrolled - heroHeight;
      const oceanHeight = documentHeight - heroHeight;
      const progress = Math.min(1, Math.max(0, oceanScrolled / oceanHeight));
      
      setScrollProgress(progress);
      
      // Linear depth calculation for smooth transitions
      const maxDepth = 11000;
      const newDepth = progress * maxDepth;
      setCurrentDepth(newDepth);

      // Find current zone with precise boundaries
      let activeZone = oceanZones[0];
      for (const zone of oceanZones) {
        if (newDepth >= zone.depthStart && newDepth < zone.depthEnd) {
          activeZone = zone;
          break;
        }
      }
      setCurrentZone(activeZone);

      // Update visible creatures with smooth visibility
      const creatures: string[] = [];
      oceanZones.forEach(zone => {
        zone.creatures.forEach(creature => {
          const creatureDepthRange = creature.maxDepth - creature.minDepth;
          const visibilityBuffer = Math.max(1000, creatureDepthRange * 0.5);
          
          if (newDepth >= creature.minDepth - visibilityBuffer && 
              newDepth <= creature.maxDepth + visibilityBuffer) {
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
        
        {/* Dynamic background with smooth zone transitions */}
        <div className="ocean-background">
          {oceanZones.map((zone, index) => {
            const zoneProgress = getZoneProgress(currentDepth, zone);
            const opacity = getZoneOpacity(currentDepth, zone);
            
            return (
              <div
                key={zone.id}
                className={`background-layer zone-${zone.id}`}
                style={{
                  opacity: opacity,
                  transform: `translateY(${scrollProgress * 50 * (index + 1)}px)`,
                  background: getZoneBackground(zone, zoneProgress)
                }}
              />
            );
          })}
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

        {/* Scrollable content sections */}
        {oceanZones.map((zone) => (
          <section
            key={zone.id}
            className="depth-section"
            style={{ 
              height: `${((zone.depthEnd - zone.depthStart) / 11000) * 400}vh`,
            }}
            data-zone={zone.id}
          />
        ))}
      </div>
    </div>
  );
}

// Improved helper functions for crisp transitions
function getZoneProgress(currentDepth: number, zone: any): number {
  if (currentDepth < zone.depthStart) return 0;
  if (currentDepth > zone.depthEnd) return 1;
  return (currentDepth - zone.depthStart) / (zone.depthEnd - zone.depthStart);
}

function getZoneOpacity(currentDepth: number, zone: any): number {
  const transitionZone = 200; // Crisp 200m transition zone
  
  // Before zone starts
  if (currentDepth < zone.depthStart - transitionZone) return 0;
  
  // After zone ends
  if (currentDepth > zone.depthEnd + transitionZone) return 0;
  
  // In the main zone
  if (currentDepth >= zone.depthStart && currentDepth <= zone.depthEnd) return 1;
  
  // Fade in transition
  if (currentDepth < zone.depthStart) {
    return Math.pow((currentDepth - (zone.depthStart - transitionZone)) / transitionZone, 2);
  }
  
  // Fade out transition
  return Math.pow(1 - ((currentDepth - zone.depthEnd) / transitionZone), 2);
}

function getZoneBackground(zone: any, progress: number): string {
  const backgrounds = {
    'sunlight': `linear-gradient(180deg, 
      hsl(195, 53%, ${75 - progress * 15}%) 0%,
      hsl(207, 44%, ${65 - progress * 20}%) 25%,
      hsl(213, 100%, ${55 - progress * 25}%) 50%,
      hsl(213, 100%, ${45 - progress * 25}%) 75%,
      hsl(213, 100%, ${35 - progress * 20}%) 100%)`,
    
    'twilight': `linear-gradient(180deg,
      hsl(213, 100%, ${25 - progress * 10}%) 0%,
      hsl(220, 100%, ${20 - progress * 10}%) 25%,
      hsl(225, 100%, ${15 - progress * 8}%) 50%,
      hsl(230, 100%, ${10 - progress * 6}%) 75%,
      hsl(235, 100%, ${5 - progress * 4}%) 100%)`,
    
    'midnight': `linear-gradient(180deg,
      hsl(240, 100%, ${5 - progress * 3}%) 0%,
      hsl(240, 100%, ${3 - progress * 2}%) 25%,
      hsl(240, 100%, ${2 - progress * 1}%) 50%,
      hsl(240, 100%, ${1 - progress * 0.5}%) 75%,
      hsl(240, 100%, 0%) 100%)`,
    
    'abyssal': `linear-gradient(180deg,
      hsl(240, 100%, 0%) 0%,
      hsl(240, 50%, ${1 - progress * 0.5}%) 25%,
      hsl(240, 30%, ${0.5 - progress * 0.3}%) 50%,
      hsl(240, 20%, ${0.2 - progress * 0.1}%) 75%,
      hsl(240, 100%, 0%) 100%)`,
    
    'hadal': `linear-gradient(180deg,
      hsl(240, 100%, 0%) 0%,
      hsl(270, 100%, ${2 + progress * 3}%) 20%,
      hsl(285, 100%, ${4 + progress * 4}%) 40%,
      hsl(270, 100%, ${2 + progress * 2}%) 60%,
      hsl(240, 100%, 0%) 100%)`
  };
  
  return backgrounds[zone.id as keyof typeof backgrounds] || 'hsl(240, 100%, 0%)';
}

export default App;