// src/js/components/InteractiveBackground.jsx
import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const mouseDivRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize canvas to fill viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Build particles
    const particles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1,
    }));

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Update the CSS-driven mouse-follower div directly — no re-render
      if (mouseDivRef.current) {
        mouseDivRef.current.style.transform =
          `translate(${e.clientX - 160}px, ${e.clientY - 160}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Move + draw each particle
      for (const p of particles) {
        p.x = (p.x + p.speedX + w) % w;
        p.y = (p.y + p.speedY + h) % h;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(156, 163, 175, ${p.opacity})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#1a202c] to-[#111827]" />

      {/* Canvas-drawn particles — zero React re-renders */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Mouse follower — positioned via direct DOM style, not state */}
      <div
        ref={mouseDivRef}
        className="absolute w-80 h-80 rounded-full opacity-5 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(156, 163, 175, 0.15) 0%, transparent 70%)',
          transform: 'translate(-9999px, -9999px)', // hidden until first mouse move
        }}
      />

      {/* Interactive Diagonal Grid (static SVG, mouse mask via CSS custom property) */}
      <div className="absolute inset-0 opacity-8">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="diagonalGrid" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
              <path d="M 0,30 l 60,0" stroke="rgba(156, 163, 175, 0.1)" strokeWidth="0.5" />
              <path d="M 30,0 l 0,60" stroke="rgba(156, 163, 175, 0.1)" strokeWidth="0.5" />
            </pattern>
            <pattern id="diagonalGridHover" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
              <path d="M 0,30 l 60,0" stroke="rgba(156, 163, 175, 0.25)" strokeWidth="1" />
              <path d="M 30,0 l 0,60" stroke="rgba(156, 163, 175, 0.25)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalGrid)" />
          <HoverGrid mouseRef={mouseRef} />
        </svg>
      </div>
    </div>
  );
}

// Separate component so only this tiny element re-renders on mouse move (it doesn't — we use rAF too)
function HoverGrid({ mouseRef }) {
  const rectRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (rectRef.current) {
        const { x, y } = mouseRef.current;
        const mask = `radial-gradient(300px circle at ${x}px ${y}px, black 0%, transparent 70%)`;
        rectRef.current.style.maskImage = mask;
        rectRef.current.style.webkitMaskImage = mask;
      }
      requestAnimationFrame(update);
    };
    const id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, [mouseRef]);

  return (
    <rect
      ref={rectRef}
      width="100%"
      height="100%"
      fill="url(#diagonalGridHover)"
      style={{ opacity: 0.6 }}
    />
  );
}
