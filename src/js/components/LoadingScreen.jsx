// src/js/components/LoadingScreen.jsx
import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#111827] flex items-center justify-center z-50">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-[#9ca3af] rounded-full animate-bounce" />
        <div className="w-3 h-3 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
        <div className="w-3 h-3 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
    </div>
  );
}

