import React from 'react';
import { ChevronDown, Waves } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-300 via-blue-400 to-blue-600">
      {/* Animated waves */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600 to-transparent opacity-60">
          <div className="wave-animation"></div>
        </div>
      </div>
      
      {/* Sun rays */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 opacity-30">
        <div className="sun-rays"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <div className="flex items-center justify-center mb-6">
          <Waves className="w-16 h-16 mr-4 text-white" />
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            Ocean
            <span className="block text-blue-200">Depths</span>
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Embark on an immersive journey from the sunlit surface to the mysterious depths 
          of our planet's final frontier
        </p>
        
        <div className="space-y-4 text-lg text-blue-100">
          <p>Discover scientifically accurate marine life</p>
          <p>Explore zones from 0 to 15,000 meters deep</p>
          <p>Experience the pressure, temperature, and darkness of the abyss</p>
        </div>
        
        <button
          onClick={scrollToContent}
          className="mt-12 inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300 group"
          aria-label="Begin ocean exploration"
        >
          Begin Descent
          <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>
  );
};

export default Hero;