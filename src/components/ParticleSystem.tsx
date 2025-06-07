import React, { useEffect, useRef } from 'react';
import { OceanZone } from '../data/oceanData';

interface ParticleSystemProps {
  depth: number;
  zone: OceanZone;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: 'plankton' | 'debris' | 'snow' | 'bubbles';
  color: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ depth, zone }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles based on depth and zone
    const initializeParticles = () => {
      const particleCount = getParticleCount(depth);
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(canvas, depth));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        updateParticle(particle, canvas);
        drawParticle(ctx, particle);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    initializeParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [depth, zone]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  );
};

function getParticleCount(depth: number): number {
  if (depth < 200) return 30; // Surface - lots of plankton
  if (depth < 1000) return 20; // Twilight - moderate activity
  if (depth < 4000) return 10; // Midnight - sparse
  return 5; // Abyss - very sparse
}

function createParticle(canvas: HTMLCanvasElement, depth: number): Particle {
  const types = getParticleTypes(depth);
  const type = types[Math.floor(Math.random() * types.length)];
  
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: Math.random() * 0.3 + 0.1,
    size: getParticleSize(type, depth),
    opacity: Math.random() * 0.6 + 0.2,
    type,
    color: getParticleColor(type, depth)
  };
}

function getParticleTypes(depth: number): Particle['type'][] {
  if (depth < 200) return ['plankton', 'bubbles'];
  if (depth < 1000) return ['plankton', 'debris'];
  if (depth < 4000) return ['debris', 'snow'];
  return ['snow'];
}

function getParticleSize(type: Particle['type'], depth: number): number {
  const baseSize = {
    plankton: 2,
    bubbles: 3,
    debris: 1.5,
    snow: 1
  }[type];
  
  return baseSize + Math.random() * 2;
}

function getParticleColor(type: Particle['type'], depth: number): string {
  switch (type) {
    case 'plankton':
      return depth < 200 ? '#4ade80' : '#22c55e';
    case 'bubbles':
      return '#ffffff';
    case 'debris':
      return '#94a3b8';
    case 'snow':
      return '#e2e8f0';
    default:
      return '#ffffff';
  }
}

function updateParticle(particle: Particle, canvas: HTMLCanvasElement) {
  particle.x += particle.vx;
  particle.y += particle.vy;

  // Wrap around screen
  if (particle.x < 0) particle.x = canvas.width;
  if (particle.x > canvas.width) particle.x = 0;
  if (particle.y > canvas.height) particle.y = 0;

  // Add some drift
  particle.vx += (Math.random() - 0.5) * 0.01;
  particle.vy += (Math.random() - 0.5) * 0.01;
}

function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle) {
  ctx.save();
  ctx.globalAlpha = particle.opacity;
  ctx.fillStyle = particle.color;

  if (particle.type === 'bubbles') {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillRect(
      particle.x - particle.size / 2,
      particle.y - particle.size / 2,
      particle.size,
      particle.size
    );
  }

  ctx.restore();
}

export default ParticleSystem;