import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundManagerProps {
  depth: number;
}

const SoundManager: React.FC<SoundManagerProps> = ({ depth }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initialize Web Audio API for ambient sounds
    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
      } catch (error) {
        console.log('Web Audio API not supported');
      }
    };

    initAudio();

    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!audioContextRef.current || !gainNodeRef.current || isMuted) return;

    // Stop previous oscillator
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }

    // Create ambient sound based on depth
    const oscillator = audioContextRef.current.createOscillator();
    const filter = audioContextRef.current.createBiquadFilter();
    
    oscillatorRef.current = oscillator;

    // Configure sound based on depth
    if (depth < 200) {
      // Surface - higher frequency, bubbling sounds
      oscillator.frequency.setValueAtTime(200, audioContextRef.current.currentTime);
      oscillator.type = 'sine';
      gainNodeRef.current.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    } else if (depth < 1000) {
      // Twilight - medium frequency
      oscillator.frequency.setValueAtTime(100, audioContextRef.current.currentTime);
      oscillator.type = 'triangle';
      gainNodeRef.current.gain.setValueAtTime(0.08, audioContextRef.current.currentTime);
    } else if (depth < 4000) {
      // Midnight - low frequency, mysterious
      oscillator.frequency.setValueAtTime(50, audioContextRef.current.currentTime);
      oscillator.type = 'sawtooth';
      gainNodeRef.current.gain.setValueAtTime(0.06, audioContextRef.current.currentTime);
    } else {
      // Abyss - very low frequency, ominous
      oscillator.frequency.setValueAtTime(25, audioContextRef.current.currentTime);
      oscillator.type = 'square';
      gainNodeRef.current.gain.setValueAtTime(0.04, audioContextRef.current.currentTime);
    }

    // Apply filter for underwater effect
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800 - depth * 0.1, audioContextRef.current.currentTime);
    
    oscillator.connect(filter);
    filter.connect(gainNodeRef.current);
    
    try {
      oscillator.start();
    } catch (error) {
      console.log('Could not start audio');
    }

  }, [depth, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        isMuted ? 0.1 : 0,
        audioContextRef.current?.currentTime || 0
      );
    }
  };

  return (
    <button
      className="sound-toggle"
      onClick={toggleMute}
      aria-label={isMuted ? 'Unmute ambient sounds' : 'Mute ambient sounds'}
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  );
};

export default SoundManager;