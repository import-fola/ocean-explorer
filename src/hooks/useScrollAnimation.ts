import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Smooth scroll setup with performance optimization
      gsap.set(containerRef.current, { 
        willChange: 'transform',
        force3D: true
      });

      // Background parallax layers
      const backgroundLayers = containerRef.current.querySelectorAll('.background-layer');
      backgroundLayers.forEach((layer, index) => {
        gsap.to(layer, {
          yPercent: -30 * (index + 1),
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      });

      // Creature animations based on scroll position
      const creatures = containerRef.current.querySelectorAll('.sea-creature');
      creatures.forEach((creature) => {
        // Floating animation
        gsap.to(creature, {
          y: '+=20',
          duration: 2 + Math.random() * 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 2
        });

        // Horizontal drift
        gsap.to(creature, {
          x: '+=50',
          duration: 5 + Math.random() * 5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 3
        });
      });

      // Zone overlay fade effects
      const zoneOverlay = containerRef.current.querySelector('.zone-overlay');
      if (zoneOverlay) {
        gsap.set(zoneOverlay, { opacity: 0.9 });
        
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const progress = self.progress;
            const opacity = 0.9 - (progress * 0.3); // Fade slightly as we go deeper
            gsap.set(zoneOverlay, { opacity: Math.max(0.6, opacity) });
          }
        });
      }

      // Depth ruler animation
      const depthIndicator = containerRef.current.querySelector('.depth-indicator');
      if (depthIndicator) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const progress = self.progress;
            const rulerHeight = window.innerHeight * 0.6 * 0.8; // 60% of ruler scale height
            gsap.set(depthIndicator, { 
              y: progress * rulerHeight,
              ease: 'none'
            });
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};