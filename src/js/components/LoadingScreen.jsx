// src/js/components/LoadingScreen.jsx
import React, { useEffect, useRef, useState } from 'react';

export default function LoadingScreen({ progress = 0, onDone }) {
  const [fading, setFading] = useState(false);
  const calledDone = useRef(false);

  // Once progress reaches 100, start the CSS fade-out
  useEffect(() => {
    if (progress >= 100 && !fading) {
      // Small pause so "Ready!" label is visible before fading
      const t = setTimeout(() => setFading(true), 150);
      return () => clearTimeout(t);
    }
  }, [progress, fading]);

  const label =
    progress < 30 ? 'Initialising…' :
    progress < 60 ? 'Loading assets…' :
    progress < 95 ? 'Almost ready…' :
                    'Ready!';

  // Called by the browser exactly when the opacity transition finishes —
  // no setTimeout needed, no extra state, no off-by-one render.
  const handleTransitionEnd = (e) => {
    if (e.propertyName === 'opacity' && fading && !calledDone.current) {
      calledDone.current = true;
      onDone?.();
    }
  };

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className="fixed inset-0 bg-[#111827] flex flex-col items-center justify-center z-[9999] transition-opacity duration-500 ease-out"
      style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? 'none' : 'auto' }}
    >
      {/* Logo */}
      <p className="text-[#f9fafb] text-3xl font-bold tracking-wide mb-10 select-none">
        Jermin<span className="text-[#9ca3af]">.</span>
      </p>

      {/* Progress bar */}
      <div className="w-56 sm:w-72 h-1 bg-[#374151] rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-[#6b7280] to-[#f9fafb] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status */}
      <div className="flex items-center justify-between w-56 sm:w-72">
        <span className="text-[#6b7280] text-xs">{label}</span>
        <span className="text-[#9ca3af] text-xs font-mono">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
