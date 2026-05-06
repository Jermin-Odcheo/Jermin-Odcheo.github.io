// src/js/components/Animated.jsx
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

// Convenience hook — consume anywhere to read the ready flag
export function useAppReady() {
  return useContext(AppReadyContext);
}

// ─── App-ready context ────────────────────────────────────────────────────────
export const AppReadyContext = createContext(false);

const BASE_ANIMATION_CLASSES = 'transition-all duration-700 ease-out will-change-transform';

const ANIMATION_PRESETS = {
  section: {
    hidden: {
      fadeInUp: 'opacity-0 translate-y-16',
      fadeInLeft: 'opacity-0 -translate-x-16',
      fadeInRight: 'opacity-0 translate-x-16',
      scaleIn: 'opacity-0 scale-90',
    },
    visible: {
      fadeInUp: 'opacity-100 translate-y-0',
      fadeInLeft: 'opacity-100 translate-x-0',
      fadeInRight: 'opacity-100 translate-x-0',
      scaleIn: 'opacity-100 scale-100',
    },
  },
  hero: {
    hidden: {
      fadeInUp: 'opacity-0 translate-y-10',
      fadeInLeft: 'opacity-0 -translate-x-10',
      fadeInRight: 'opacity-0 translate-x-10',
      scaleIn: 'opacity-0 scale-95',
      fadeIn: 'opacity-0',
    },
    visible: {
      fadeInUp: 'opacity-100 translate-y-0',
      fadeInLeft: 'opacity-100 translate-x-0',
      fadeInRight: 'opacity-100 translate-x-0',
      scaleIn: 'opacity-100 scale-100',
      fadeIn: 'opacity-100',
    },
  },
};

const getAnimationClass = (presetKey, isVisible, animation) => {
  const preset = ANIMATION_PRESETS[presetKey] ?? ANIMATION_PRESETS.section;
  const map = isVisible ? preset.visible : preset.hidden;
  return map[animation] ?? map.fadeInUp;
};

function AnimatedBase({
  children,
  className = '',
  delay = 0,
  animation = 'fadeInUp',
  preset = 'section',
  isVisible,
  delayWhenVisible = false,
}) {
  const delayValue = delayWhenVisible && !isVisible ? '0ms' : `${delay}ms`;

  return (
    <div
      className={`${className} ${BASE_ANIMATION_CLASSES} ${getAnimationClass(preset, isVisible, animation)}`}
      style={{ transitionDelay: delayValue }}
    >
      {children}
    </div>
  );
}

// Custom hook for scroll animations.
// once=true  → stays visible after the first intersection (prevents hero blanking on scroll-up)
// once=false → toggles on/off as the element enters/leaves the viewport
export function useScrollAnimation(threshold = 0.1, once = true, rootMargin = '50px') {
  const isReady = useContext(AppReadyContext);
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const ref = useRef(null);

  const observerOptions = useMemo(() => ({ threshold, rootMargin }), [threshold, rootMargin]);

  useEffect(() => {
    if (!isReady) return;

    const setVisible = (next) => {
      isVisibleRef.current = next;
      setIsVisible((prev) => (prev === next ? prev : next));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isVisibleRef.current) setVisible(true);
          if (once) observer.disconnect();
        } else if (!once && isVisibleRef.current) {
          setVisible(false);
        }
      },
      observerOptions,
    );

    if (ref.current) {
      observer.observe(ref.current);

      // Fallback: if the element is already in the viewport when we attach,
      // the IntersectionObserver callback fires asynchronously, which can
      // cause a one-frame flicker. Force-check synchronously so the very
      // first paint is already in the visible state.
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setVisible(true);
        if (once) observer.disconnect();
      }
    }

    return () => observer.disconnect();
  }, [isReady, observerOptions, once]);

  return [ref, isVisible];
}

// Animated wrapper component
export function AnimatedSection({ children, className = '', delay = 0, animation = 'fadeInUp' }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div ref={ref}>
      <AnimatedBase className={className} delay={delay} animation={animation} preset="section" isVisible={isVisible}>
        {children}
      </AnimatedBase>
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
          className={`${BASE_ANIMATION_CLASSES} ${
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
export function HeroAnimated({ children, className = '', delay = 0, animation = 'fadeInUp' }) {
  const isReady = useAppReady();

  return (
    <AnimatedBase
      className={className}
      delay={delay}
      animation={animation}
      preset="hero"
      isVisible={isReady}
      delayWhenVisible
    >
      {children}
    </AnimatedBase>
  );
}
