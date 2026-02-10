// src/js/components/InteractiveBackground.jsx
import React, { useEffect, useState } from 'react';

export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const initialParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setParticles(initialParticles);

    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: (p.x + p.speedX + window.innerWidth) % window.innerWidth,
          y: (p.y + p.speedY + window.innerHeight) % window.innerHeight,
        }))
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    const particleInterval = setInterval(animateParticles, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#1a202c] to-[#111827]" />

      {/* Subtle mouse follower gradient */}
      <div
        className="absolute w-80 h-80 rounded-full opacity-5 transition-all duration-700 ease-out"
        style={{
          left: mousePosition.x - 160,
          top: mousePosition.y - 160,
          background: 'radial-gradient(circle, rgba(156, 163, 175, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Subtle floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-[#9ca3af] rounded-full"
          style={{ left: p.x, top: p.y, opacity: p.opacity, transform: `scale(${p.size})` }}
        />
      ))}

      {/* Interactive Diagonal Grid */}
      <div className="absolute inset-0 opacity-8">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="diagonalGrid" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
              <path d="M 0,30 l 60,0" stroke="rgba(156, 163, 175, 0.1)" strokeWidth="0.5" className="grid-line" />
              <path d="M 30,0 l 0,60" stroke="rgba(156, 163, 175, 0.1)" strokeWidth="0.5" className="grid-line" />
            </pattern>

            <pattern id="diagonalGridHover" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
              <path d="M 0,30 l 60,0" stroke="rgba(156, 163, 175, 0.25)" strokeWidth="1" className="grid-line-hover" />
              <path d="M 30,0 l 0,60" stroke="rgba(156, 163, 175, 0.25)" strokeWidth="1" className="grid-line-hover" />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#diagonalGrid)" className="grid-base" />

          {/* Interactive hover layer */}
          <rect
            width="100%"
            height="100%"
            fill="url(#diagonalGridHover)"
            className="grid-hover opacity-0 transition-opacity duration-300"
            style={{
              maskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 70%)`,
              WebkitMaskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 70%)`,
            }}
          />
        </svg>
      </div>
    </div>
  );
}

