// src/js/components/Animated.jsx
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

// Convenience hook — consume anywhere to read the ready flag
export function useAppReady() {
  return useContext(AppReadyContext);
}

// ─── App-ready context ────────────────────────────────────────────────────────
export const AppReadyContext = createContext(false);

// Custom hook for scroll animations.
// once=true  → stays visible after the first intersection (prevents hero blanking on scroll-up)
// once=false → toggles on/off as the element enters/leaves the viewport
export function useScrollAnimation(threshold = 0.1, once = true) {
  const isReady = useContext(AppReadyContext);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    // Don't attach until the app is ready — avoids immediately-visible
    // sections skipping their entry animation.
    if (!isReady) return;

    const show = () => {
      hasBeenVisible.current = true;
      setIsVisible(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          if (once) observer.disconnect(); // no need to keep watching
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '50px' },
    );

    if (ref.current) {
      observer.observe(ref.current);

      // Fallback: if the element is already in the viewport when we attach,
      // the IntersectionObserver callback fires asynchronously, which can
      // cause a one-frame flicker. Force-check synchronously so the very
      // first paint is already in the visible state.
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        show();
        if (once) observer.disconnect();
      }
    }

    return () => observer.disconnect();
  }, [isReady, threshold, once]);

  return [ref, isVisible];
}

// Animated wrapper component
export function AnimatedSection({ children, className = '', delay = 0, animation = 'fadeInUp' }) {
  const [ref, isVisible] = useScrollAnimation();

  const hiddenMap = {
    fadeInUp:    'opacity-0 translate-y-16',
    fadeInLeft:  'opacity-0 -translate-x-16',
    fadeInRight: 'opacity-0 translate-x-16',
    scaleIn:     'opacity-0 scale-90',
  };

  const visibleMap = {
    fadeInUp:    'opacity-100 translate-y-0',
    fadeInLeft:  'opacity-100 translate-x-0',
    fadeInRight: 'opacity-100 translate-x-0',
    scaleIn:     'opacity-100 scale-100',
  };

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out will-change-transform ${
        isVisible
          ? visibleMap[animation] ?? visibleMap.fadeInUp
          : hiddenMap[animation] ?? hiddenMap.fadeInUp
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Staggered children container
export function StaggeredContainer({ children, className = '', staggerDelay = 100 }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`transition-all duration-700 ease-out will-change-transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// ─── HeroAnimated ─────────────────────────────────────────────────────────────
// For the Hero section only — driven directly by appReady context, NOT by an
// IntersectionObserver. Guarantees animation fires the moment the loading
// screen is gone regardless of scroll position.
export function HeroAnimated({ children, className = '', delay = 0, animation = 'fadeInUp' }) {
  const isReady = useAppReady();

  const hiddenMap = {
    fadeInUp:    'opacity-0 translate-y-10',
    fadeInLeft:  'opacity-0 -translate-x-10',
    fadeInRight: 'opacity-0 translate-x-10',
    scaleIn:     'opacity-0 scale-95',
    fadeIn:      'opacity-0',
  };

  const visibleMap = {
    fadeInUp:    'opacity-100 translate-y-0',
    fadeInLeft:  'opacity-100 translate-x-0',
    fadeInRight: 'opacity-100 translate-x-0',
    scaleIn:     'opacity-100 scale-100',
    fadeIn:      'opacity-100',
  };

  return (
    <div
      className={`${className} transition-all duration-700 ease-out will-change-transform ${
        isReady
          ? visibleMap[animation] ?? visibleMap.fadeInUp
          : hiddenMap[animation] ?? hiddenMap.fadeInUp
      }`}
      style={{ transitionDelay: isReady ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}
