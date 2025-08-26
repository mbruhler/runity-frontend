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

    // Draw static grid once
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw static grid
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      // Set static style
      ctx.strokeStyle = `rgba(34, 211, 238, 0.03)`;
      ctx.lineWidth = 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          
          // Draw grid lines
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
            ctx.fillStyle = `rgba(251, 191, 36, 0.1)`;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };
    drawGrid();

    // Redraw on resize
    const handleResize = () => {
      resizeCanvas();
      drawGrid();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[3] pointer-events-none opacity-50"
    />
  );
}