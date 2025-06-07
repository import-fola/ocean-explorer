import React from 'react';
import { OceanZone as OceanZoneType } from '../data/oceanData';
import SpeciesCard from './SpeciesCard';
import { Thermometer, Gauge, Eye, Waves } from 'lucide-react';

interface OceanZoneProps {
  zone: OceanZoneType;
  index: number;
  animationsEnabled: boolean;
}

const OceanZone: React.FC<OceanZoneProps> = ({ zone, index, animationsEnabled }) => {
  const getZoneIcon = (zoneId: string) => {
    switch (zoneId) {
      case 'sunlight': return <Eye className="w-6 h-6" />;
      case 'twilight': return <Eye className="w-6 h-6 opacity-70" />;
      case 'midnight': return <Eye className="w-6 h-6 opacity-40" />;
      case 'abyssal': return <Gauge className="w-6 h-6" />;
      case 'hadal': return <Thermometer className="w-6 h-6" />;
      default: return <Waves className="w-6 h-6" />;
    }
  };

  return (
    <section 
      className={`depth-zone relative min-h-screen py-20 px-4 bg-gradient-to-b ${zone.backgroundColor} transition-all duration-1000`}
      id={zone.id}
      aria-labelledby={`${zone.id}-title`}
    >
      {/* Parallax background layers */}
      <div className="parallax-layer absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Zone Header */}
        <div className="zone-content text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            {getZoneIcon(zone.id)}
          </div>
          
          <h2 
            id={`${zone.id}-title`}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            {zone.name}
          </h2>
          
          <div className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            {zone.description}
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/70 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[150px]">
              <div className="text-2xl font-bold text-white">{zone.depthStart}-{zone.depthEnd}m</div>
              <div className="text-sm">Depth Range</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[150px]">
              <div className="text-2xl font-bold text-white">{zone.temperature}</div>
              <div className="text-sm">Temperature</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[150px]">
              <div className="text-2xl font-bold text-white">{zone.pressure}</div>
              <div className="text-sm">Pressure</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[150px]">
              <div className="text-2xl font-bold text-white">{zone.lightLevel}</div>
              <div className="text-sm">Light Level</div>
            </div>
          </div>
        </div>
        
        {/* Environmental Effects */}
        <div className="zone-content mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Environmental Conditions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {zone.environmentalEffects.map((effect, idx) => (
              <div 
                key={idx}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center text-white"
              >
                {effect}
              </div>
            ))}
          </div>
        </div>
        
        {/* Species Grid */}
        <div className="zone-content">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Marine Life
            {zone.id === 'speculative' && (
              <span className="block text-lg font-normal text-yellow-300 mt-2">
                ⚠️ Speculative Content - Based on Scientific Hypotheses
              </span>
            )}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {zone.species.map((species, speciesIndex) => (
              <SpeciesCard
                key={species.id}
                species={species}
                index={speciesIndex}
                animationsEnabled={animationsEnabled}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Zone transition effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default OceanZone;