import React, { useState } from 'react';
import { Species } from '../data/oceanData';
import { Info, AlertTriangle } from 'lucide-react';

interface SpeciesCardProps {
  species: Species;
  index: number;
  animationsEnabled: boolean;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({ species, index, animationsEnabled }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div 
      className={`species-item relative h-80 cursor-pointer group ${animationsEnabled ? 'transition-all duration-500 hover:scale-105' : ''}`}
      onClick={handleCardClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`Learn more about ${species.name}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-start justify-between mb-4">
            <h4 className="text-xl font-bold text-white leading-tight">
              {species.name}
            </h4>
            {species.isSpeculative && (
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 ml-2" />
            )}
          </div>
          
          <p className="text-white/80 italic mb-4 text-sm">
            {species.scientificName}
          </p>
          
          <div className="space-y-3 text-white/70 text-sm">
            <div>
              <span className="font-semibold text-white">Size:</span> {species.size}
            </div>
            <div>
              <span className="font-semibold text-white">Depth:</span> {species.depthRange}
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4">
            <Info className="w-5 h-5 text-white/50" />
          </div>
          
          <div className="absolute bottom-4 left-4 text-xs text-white/50">
            Click to learn more
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h4 className="text-lg font-bold text-white mb-3">
            {species.name}
            {species.isSpeculative && (
              <span className="block text-sm font-normal text-yellow-300 mt-1">
                Speculative Species
              </span>
            )}
          </h4>
          
          <div className="space-y-4 text-white/80 text-sm">
            <div>
              <span className="font-semibold text-white block mb-1">Unique Fact:</span>
              {species.uniqueFact}
            </div>
            
            <div>
              <span className="font-semibold text-white block mb-1">Description:</span>
              {species.description}
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 text-xs text-white/50">
            Click to flip back
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesCard;