"use client";

import { useEffect, useRef } from "react";

export function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Grid animation parameters
    let time = 0;
    const gridSize = 80;
    const waveAmplitude = 0;
    const waveSpeed = 0;

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated grid
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          
          // Calculate wave effect
          const distance = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + 
            Math.pow(y - canvas.height / 2, 2)
          );
          const wave = Math.sin(distance * 0.003 - time) * waveAmplitude;
          
          // Draw grid lines with wave effect
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.03 + wave * 0.02})`;
          ctx.lineWidth = 1;
          
          // Horizontal lines
          ctx.beginPath();
          ctx.moveTo(x - gridSize / 2, y);
          ctx.lineTo(x + gridSize / 2, y);
          ctx.stroke();
          
          // Vertical lines
          ctx.beginPath();
          ctx.moveTo(x, y - gridSize / 2);
          ctx.lineTo(x, y + gridSize / 2);
          ctx.stroke();
          
          // Draw intersection points
          if (i > 0 && j > 0) {
            const pointOpacity = 0.1 + wave * 0.05;
            ctx.fillStyle = `rgba(251, 191, 36, ${pointOpacity})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      time += waveSpeed;
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[3] pointer-events-none opacity-50"
    />
  );
}