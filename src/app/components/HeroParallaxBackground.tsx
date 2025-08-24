"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function HeroParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Different parallax speeds for background layers
  const bgY1 = useTransform(smoothProgress, [0, 1], [0, -100]); // Slowest (0.5x)
  const bgY2 = useTransform(smoothProgress, [0, 1], [0, -200]); // Medium (0.7x)
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0.5]);
  
  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      {/* Primary city background with parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{
          y: bgY1,
          scale: bgScale,
          opacity: bgOpacity,
        }}
      >
        <div
          className="absolute inset-0 w-full h-[120%]"
          style={{
            backgroundImage: `url('/background.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.3) contrast(1.2)',
            transform: 'translateZ(0)', // Force GPU acceleration
          }}
        />
      </motion.div>
      
      {/* Secondary overlay for depth with different parallax speed */}
      <motion.div 
        className="absolute inset-0 mix-blend-overlay"
        style={{
          y: bgY2,
        }}
      >
        <div
          className="absolute inset-0 w-full h-[120%]"
          style={{
            backgroundImage: `url('/background.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            opacity: 0.2,
            filter: 'hue-rotate(180deg)',
            transform: 'translateZ(0)', // Force GPU acceleration
          }}
        />
      </motion.div>
    </div>
  );
}