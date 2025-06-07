import React from 'react';
import { Settings, Pause, Play, Eye, EyeOff } from 'lucide-react';

interface AccessibilityControlsProps {
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
}

const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({
  animationsEnabled,
  setAnimationsEnabled,
  highContrast,
  setHighContrast
}) => {
  return (
    <div className="fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white">
      <div className="flex items-center gap-2 mb-3">
        <Settings className="w-4 h-4" />
        <span className="text-sm font-semibold">Accessibility</span>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={() => setAnimationsEnabled(!animationsEnabled)}
          className="flex items-center gap-2 text-sm hover:text-blue-300 transition-colors w-full text-left"
          aria-label={animationsEnabled ? 'Disable animations' : 'Enable animations'}
        >
          {animationsEnabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {animationsEnabled ? 'Pause Animations' : 'Play Animations'}
        </button>
        
        <button
          onClick={() => setHighContrast(!highContrast)}
          className="flex items-center gap-2 text-sm hover:text-blue-300 transition-colors w-full text-left"
          aria-label={highContrast ? 'Disable high contrast' : 'Enable high contrast'}
        >
          {highContrast ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {highContrast ? 'Normal Contrast' : 'High Contrast'}
        </button>
      </div>
    </div>
  );
};

export default AccessibilityControls;