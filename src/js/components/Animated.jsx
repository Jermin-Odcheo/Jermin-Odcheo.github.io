// src/js/components/Animated.jsx
import React, { useEffect, useRef, useState } from 'react';

// Custom hook for scroll animations with direction detection
export function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const ref = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
    };

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold, rootMargin: '50px' }
    );

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (ref.current) observer.observe(ref.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  return [ref, isVisible, scrollDirection];
}

// Animated wrapper component
export function AnimatedSection({ children, className = '', delay = 0, animation = 'fadeInUp' }) {
  const [ref, isVisible] = useScrollAnimation();

  const hiddenMap = {
    fadeInUp: 'opacity-0 translate-y-16',
    fadeInLeft: 'opacity-0 -translate-x-16',
    fadeInRight: 'opacity-0 translate-x-16',
    scaleIn: 'opacity-0 scale-90',
  };

  const visibleMap = {
    fadeInUp: 'opacity-100 translate-y-0',
    fadeInLeft: 'opacity-100 translate-x-0',
    fadeInRight: 'opacity-100 translate-x-0',
    scaleIn: 'opacity-100 scale-100',
  };

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible ? visibleMap[animation] ?? visibleMap.fadeInUp : hiddenMap[animation] ?? hiddenMap.fadeInUp
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
          className={`transition-all duration-700 ease-out ${
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

