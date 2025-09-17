// src/js/main.jsx
import React, { StrictMode, useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs.js';
import { useInView } from 'react-intersection-observer';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../index.css';

// Animation Variants for Framer Motion
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 60
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: -60
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeInRight = {
  hidden: {
    opacity: 0,
    x: 60
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerItem = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Import images
import inventoryLogin from '../assets/internship-project/ims_login.png';
import inventoryDashboard from '../assets/internship-project/ims_dashboard.png';
import animeHomepage from '../assets/academic-project/anime-rest-api/Anime.jpeg';
import mangaHomepage from '../assets/academic-project/anime-rest-api/Manga.jpeg';
import thesisChat1 from '../assets/thesis-project/Chat1.jpeg';
import thesisChat2 from '../assets/thesis-project/Chat2.jpeg';
import thesisHomepage from '../assets/thesis-project/Homepage.jpeg';
import cluster from '../assets/academic-project/crime-pattern/cluster.png';
// Profile image with Vite hashing - will generate secure hash-based filename
import profileImageUrl from '../assets/profile/profile.png';
// Add certificate PDF imports
import certHTB from '../assets/certificates/Certificate-frankensteinz.pdf';
import certTHM from '../assets/certificates/THM-3YAANKUEPF.pdf';
import certUdemyAI from '../assets/certificates/UC-0497434b-3c91-4447-b8a1-9044d7dbeaad.pdf';
import certUdemyPython from '../assets/certificates/UC-171e9dab-d53d-4b66-a57a-55e93a3cf0a5.pdf';
import certUdemyWeb from '../assets/certificates/UC-9ebeab56-a4f1-4d4f-a1a7-1cfbb0901a8a.pdf';
// Add PDF.js imports for rendering certificate previews
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import PdfJsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker';

// Custom hook for scroll animations with direction detection
function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const ref = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset visibility when element leaves viewport for re-animation
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '50px' }
    );

    window.addEventListener('scroll', handleScroll, { passive: true });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible, scrollDirection];
}

// Animated wrapper component
function AnimatedSection({ children, className = '', delay = 0, animation = 'fadeInUp' }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible
          ? `opacity-100 ${animation === 'fadeInUp' ? 'translate-y-0' : animation === 'fadeInLeft' ? 'translate-x-0' : animation === 'fadeInRight' ? 'translate-x-0' : animation === 'scaleIn' ? 'scale-100' : 'translate-y-0'}`
          : `opacity-0 ${animation === 'fadeInUp' ? 'translate-y-16' : animation === 'fadeInLeft' ? '-translate-x-16' : animation === 'fadeInRight' ? 'translate-x-16' : animation === 'scaleIn' ? 'scale-90' : 'translate-y-16'}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Staggered children component
function StaggeredContainer({ children, className = '', staggerDelay = 100 }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// Color Palette Constants
const colors = {
  darkest: '#111827',   // Deep dark blue-gray
  dark: '#374151',      // Dark gray
  medium: '#6b7280',    // Medium gray
  light: '#9ca3af',     // Light gray
  lightest: '#f9fafb'   // Off-white
};

// Interactive Background Component with Diagonal Grid
function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Initialize fewer, more subtle particles
    const initialParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1
    }));
    setParticles(initialParticles);

    // Mouse move handler
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Particle animation
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight
      })));
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
        {/* Static gradient background - removed pulse animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#1a202c] to-[#111827]"></div>

        {/* Subtle mouse follower gradient - reduced opacity */}
        <div
            className="absolute w-80 h-80 rounded-full opacity-5 transition-all duration-700 ease-out"
            style={{
              left: mousePosition.x - 160,
              top: mousePosition.y - 160,
              background: `radial-gradient(circle, rgba(156, 163, 175, 0.15) 0%, transparent 70%)`
            }}
        ></div>

        {/* Subtle floating particles */}
        {particles.map(particle => (
            <div
                key={particle.id}
                className="absolute w-1 h-1 bg-[#9ca3af] rounded-full"
                style={{
                  left: particle.x,
                  top: particle.y,
                  opacity: particle.opacity,
                  transform: `scale(${particle.size})`
                }}
            ></div>
        ))}

        {/* Interactive Diagonal Grid */}
        <div className="absolute inset-0 opacity-8">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern
                  id="diagonalGrid"
                  patternUnits="userSpaceOnUse"
                  width="60"
                  height="60"
                  patternTransform="rotate(45)"
              >
                <path
                    d="M 0,30 l 60,0"
                    stroke="rgba(156, 163, 175, 0.1)"
                    strokeWidth="0.5"
                    className="grid-line"
                />
                <path
                    d="M 30,0 l 0,60"
                    stroke="rgba(156, 163, 175, 0.1)"
                    strokeWidth="0.5"
                    className="grid-line"
                />
              </pattern>

              <pattern
                  id="diagonalGridHover"
                  patternUnits="userSpaceOnUse"
                  width="60"
                  height="60"
                  patternTransform="rotate(45)"
              >
                <path
                    d="M 0,30 l 60,0"
                    stroke="rgba(156, 163, 175, 0.25)"
                    strokeWidth="1"
                    className="grid-line-hover"
                />
                <path
                    d="M 30,0 l 0,60"
                    stroke="rgba(156, 163, 175, 0.25)"
                    strokeWidth="1"
                    className="grid-line-hover"
                />
              </pattern>
            </defs>

            <rect
                width="100%"
                height="100%"
                fill="url(#diagonalGrid)"
                className="grid-base"
            />

            {/* Interactive hover layer */}
            <rect
                width="100%"
                height="100%"
                fill="url(#diagonalGridHover)"
                className="grid-hover opacity-0 transition-opacity duration-300"
                style={{
                  maskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 70%)`,
                  WebkitMaskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 70%)`
                }}
            />
          </svg>
        </div>

        <style jsx>{`
          .grid-base:hover ~ .grid-hover {
            opacity: 1;
          }

          @media (hover: hover) {
            .grid-hover {
              opacity: 0;
            }

            body:hover .grid-hover {
              opacity: 1;
            }
          }
        `}</style>
      </div>
  );
}

// Loading Screen Component
function LoadingScreen() {
  return (
      <div className="fixed inset-0 bg-[#111827] flex items-center justify-center z-50">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-[#9ca3af] rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
  );
}

// Navigation Component
function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.5 }
    );

    window.addEventListener('scroll', handleScroll);
    document.querySelectorAll('section[id]').forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 px-4 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="bg-[#111827]/90 backdrop-blur-md rounded-full px-3 sm:px-6 py-2 sm:py-3 border border-[#374151] shadow-2xl">
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-8">
            <button
                onClick={(e) => scrollToSection('hero', e)}
                className="text-[#f9fafb] font-bold text-lg hover:text-[#9ca3af] transition-colors"
            >
              Jermin
            </button>

            <div className="flex space-x-6">
              {['experience', 'projects', 'certifications', 'contact'].map((section) => (
                  <button
                      key={section}
                      onClick={(e) => scrollToSection(section, e)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                          activeSection === section
                              ? 'bg-[#374151] text-[#f9fafb]'
                              : 'text-[#9ca3af] hover:text-[#f9fafb] hover:bg-[#374151]/50'
                      }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden flex items-center justify-between">
            <button
                onClick={(e) => scrollToSection('hero', e)}
                className="text-[#f9fafb] font-bold text-base hover:text-[#9ca3af] transition-colors"
            >
              Jermin
            </button>

            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#f9fafb] p-2 hover:text-[#9ca3af] transition-colors"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
            <div className="sm:hidden absolute top-full left-0 right-0 mt-2 bg-[#111827]/95 backdrop-blur-md rounded-xl border border-[#374151] shadow-2xl overflow-hidden">
              {['experience', 'projects', 'certifications', 'contact'].map((section) => (
                  <button
                      key={section}
                      onClick={(e) => scrollToSection(section, e)}
                      className={`w-full text-left px-4 py-3 transition-all border-b border-[#374151]/50 last:border-b-0 ${
                          activeSection === section
                              ? 'bg-[#374151] text-[#f9fafb]'
                              : 'text-[#9ca3af] hover:text-[#f9fafb] hover:bg-[#374151]/50'
                      }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
              ))}
            </div>
        )}
      </nav>
  );
}

// Enhanced Hero Section with Integrated About Me
function Hero() {
  const [showResume, setShowResume] = useState(false);

  // Skills with icons - different design from social links
  const skills = [
    { name: 'Python', icon: 'fab fa-python', color: 'from-blue-400 to-yellow-400' },
    { name: 'Java', icon: 'fab fa-java', color: 'from-red-500 to-orange-500' },
    { name: 'HTML5/CSS3', icon: 'fab fa-html5', color: 'from-orange-500 to-red-500' },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: 'from-yellow-400 to-yellow-600' },
    { name: 'React', icon: 'fab fa-react', color: 'from-cyan-400 to-blue-500' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: 'from-green-500 to-green-700' },
    { name: 'Tailwind CSS', icon: 'fas fa-wind', color: 'from-cyan-400 to-teal-500' },
    { name: 'PHP', icon: 'fab fa-php', color: 'from-indigo-500 to-purple-600' },
    { name: 'SQL', icon: 'fas fa-database', color: 'from-gray-500 to-gray-700' },
    { name: 'Git', icon: 'fab fa-git-alt', color: 'from-orange-600 to-red-600' },
    {name:"Wordpress", icon: "fab fa-wordpress", color: "from-blue-600 to-blue-800"},
    {name:"Drupal", icon:"fab fa-drupal", color: "from-green-600 to-green-800"},
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeView = () => {
    setShowResume(true);
  };

  const handleResumeDownload = () => {
    // Create a temporary link for download
    const link = document.createElement('a');
    link.href = '/assets/resume/odcheo_resume.pdf';
    link.download = 'odcheo_resume.pdf';
    link.click();
  };

  const handleResumeViewInNewTab = () => {
    window.open('/assets/resume/odcheo_resume.pdf', '_blank');
  };

  return (
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
        <div className="container mx-auto px-6 relative z-10">
          {/* Two Column Layout for Desktop, Single Column for Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

            {/* Left Column - Main Introduction */}
            <AnimatedSection animation="fadeInLeft" className="text-center lg:text-left space-y-8">
              {/* Employment Status Badge */}
              <AnimatedSection delay={200} className="flex justify-center lg:justify-start">
                <div className="bg-green-500/20 border border-green-500/50 rounded-full px-6 py-2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  <span className="text-green-400 font-medium text-sm">Available for Employment</span>
                </div>
              </AnimatedSection>

              {/* Avatar */}
              <AnimatedSection animation="scaleIn" delay={400} className="flex justify-center lg:justify-start">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#374151] to-[#6b7280] p-1 hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-[#f9fafb] flex items-center justify-center">
                    <img src={profileImageUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  </div>
                </div>
              </AnimatedSection>

              {/* Name and Title */}
              <AnimatedSection delay={600}>
                <h1 className="text-5xl lg:text-6xl font-bold text-[#f9fafb] mb-4">
                  Jermin Odcheo
                </h1>
                <p className="text-2xl text-[#9ca3af] mb-4">
                  Full-Stack Developer
                </p>
                <div className="flex items-center justify-center lg:justify-start space-x-4 text-[#6b7280] mb-6">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Philippines/Australia</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-graduation-cap"></i>
                    <span>BSIT Graduate</span>
                  </div>
                </div>
              </AnimatedSection>

              {/* Professional Summary */}
              <AnimatedSection delay={800} className="bg-[#374151]/20 backdrop-blur-sm rounded-xl p-6 border border-[#6b7280]/30">
                <h3 className="text-[#f9fafb] font-semibold mb-3 flex items-center">
                  <i className="fas fa-user mr-2"></i>
                  Professional Summary
                </h3>
                <p className="text-[#9ca3af] leading-relaxed">
                  I'm a full-stack developer skilled in modern web technologies and AI integration. I'm eager to build scalable web applications and contribute to innovative projects with a dynamic team.
                </p>
              </AnimatedSection>

              {/* Action Buttons */}
              <AnimatedSection delay={1000} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                    onClick={handleResumeView}
                    className="flex items-center justify-center space-x-2 bg-[#9ca3af] hover:bg-[#f9fafb] text-[#111827] font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <i className="fas fa-file-alt"></i>
                  <span>View Resume</span>
                </button>

                <button
                    onClick={handleResumeDownload}
                    className="flex items-center justify-center space-x-2 bg-[#374151] hover:bg-[#6b7280] text-[#f9fafb] font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg border border-[#6b7280]/30"
                >
                  <i className="fas fa-download"></i>
                  <span>Download Resume</span>
                </button>
              </AnimatedSection>

              {/* Social Links */}
              <AnimatedSection delay={1200} className="flex justify-center lg:justify-start space-x-4">
                {[
                  { icon: 'fab fa-github', href: 'https://github.com/Jermin-Odcheo', label: 'GitHub', color: 'hover:bg-gray-700' },
                  { icon: 'fab fa-linkedin', href: 'https://linkedin.com/in/jerminodcheo', label: 'LinkedIn', color: 'hover:bg-blue-600' },
                  { icon: 'fas fa-envelope', href: 'mailto:jerminbodcheo@gmail.com', label: 'Email', color: 'hover:bg-red-600' }
                ].map(({ icon, href, label, color }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-full bg-[#374151] ${color} text-[#f9fafb] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl border border-[#6b7280]/30`}
                        aria-label={label}
                    >
                      <i className={`${icon} text-lg`}></i>
                    </a>
                ))}
              </AnimatedSection>
            </AnimatedSection>

            {/* Right Column - Skills & Education */}
            <AnimatedSection animation="fadeInRight" className="space-y-8">
              {/* Technical Skills */}
              <AnimatedSection delay={300} className="bg-[#374151]/20 backdrop-blur-sm rounded-xl p-6 border border-[#6b7280]/30">
                <h3 className="text-[#f9fafb] font-semibold mb-6 flex items-center text-lg">
                  <i className="fas fa-code mr-2"></i>
                  Technical Skills
                </h3>
                <StaggeredContainer className="grid grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                      <div
                          key={skill.name}
                          className="group flex items-center space-x-3 bg-[#111827]/30 rounded-lg px-3 py-2 hover:bg-[#6b7280]/30 transition-all duration-300"
                      >
                        <div className={`w-6 h-6 rounded bg-gradient-to-r ${skill.color} flex items-center justify-center flex-shrink-0`}>
                          <i className={`${skill.icon} text-white text-xs`}></i>
                        </div>
                        <span className="text-[#f9fafb] font-medium text-sm">{skill.name}</span>
                      </div>
                  ))}
                </StaggeredContainer>
              </AnimatedSection>

              {/* Education & Certifications */}
              <AnimatedSection delay={500} className="bg-[#374151]/20 backdrop-blur-sm rounded-xl p-6 border border-[#6b7280]/30">
                <h3 className="text-[#f9fafb] font-semibold mb-4 flex items-center text-lg">
                  <i className="fas fa-graduation-cap mr-2"></i>
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-[#9ca3af]/30 pl-4">
                    <h4 className="text-[#f9fafb] font-medium">Bachelor of Science in Information Technology</h4>
                    <p className="text-[#9ca3af] text-sm">Saint Louis University, Baguio City</p>
                    <p className="text-[#6b7280] text-sm">2021 - 2025</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Key Achievements */}
              <AnimatedSection delay={700} className="bg-[#374151]/20 backdrop-blur-sm rounded-xl p-6 border border-[#6b7280]/30">
                <h3 className="text-[#f9fafb] font-semibold mb-4 flex items-center text-lg">
                  <i className="fas fa-trophy mr-2"></i>
                  Key Achievements
                </h3>
                <StaggeredContainer className="space-y-3">
                  {[
                    'Developed AI chatbot with 72% accuracy rate',
                    'Led inventory management system development',
                    'Completed full-stack web development projects',
                  ].map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <i className="fas fa-check-circle text-green-400 mt-1 text-sm"></i>
                        <span className="text-[#9ca3af] text-sm">{achievement}</span>
                      </div>
                  ))}
                </StaggeredContainer>
              </AnimatedSection>
            </AnimatedSection>
          </div>

          {/* Scroll Indicator */}
          <AnimatedSection delay={1400} className="absolute -bottom-24 left-1/2 transform -translate-x-1/2">
            <button
                onClick={() => scrollToSection('experience')}
                className="animate-bounce hover:animate-pulse transition-all duration-300 cursor-pointer group">
              <div className="flex flex-col items-center space-y-2">
                <span className="text-[#9ca3af] text-sm group-hover:text-[#f9fafb] transition-colors">Explore My Work</span>
                <i className="fas fa-chevron-down text-[#9ca3af] text-xl group-hover:text-[#f9fafb] transition-colors"></i>
              </div>
            </button>
          </AnimatedSection>
        </div>

        {/* Resume Modal */}
        {showResume && (
            <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
              <div className="bg-[#374151] rounded-xl max-w-6xl w-full max-h-[95vh] overflow-hidden border border-[#6b7280] shadow-2xl">
                <div className="p-4 sm:p-6 border-b border-[#6b7280] flex justify-between items-center bg-[#374151] z-10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#f9fafb]">Resume - Jermin Odcheo</h3>
                    <p className="text-[#9ca3af] text-sm">Full-Stack Developer</p>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <button
                        onClick={handleResumeViewInNewTab}
                        className="flex items-center space-x-1 sm:space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-2 rounded-lg transition-colors text-sm"
                        title="Open in new tab"
                    >
                      <i className="fas fa-external-link-alt text-xs sm:text-sm"></i>
                      <span className="hidden sm:inline">New Tab</span>
                    </button>
                    <button
                        onClick={handleResumeDownload}
                        className="flex items-center space-x-1 sm:space-x-2 bg-[#9ca3af] hover:bg-[#f9fafb] text-[#111827] px-2 sm:px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <i className="fas fa-download text-xs sm:text-sm"></i>
                      <span className="hidden sm:inline">Download</span>
                    </button>
                    <button
                        onClick={() => setShowResume(false)}
                        className="text-[#9ca3af] hover:text-[#f9fafb] text-xl sm:text-2xl p-2 rounded-lg hover:bg-[#6b7280]/30 transition-all"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>

                <div className="relative w-full h-[calc(95vh-80px)] bg-[#f9fafb]">
                  {/* PDF Embed - Primary method */}
                  <embed
                      src="/src/assets/resume/odcheo_resume.pdf#toolbar=1&navpanes=1&scrollbar=1"
                      type="application/pdf"
                      className="w-full h-full"
                      onError={() => {
                        // Fallback if embed fails
                        console.log('Embed failed, trying iframe fallback');
                        document.getElementById('resume-iframe-fallback').classList.remove('hidden');
                      }}
                  />

                  {/* Fallback iframe */}
                  <iframe
                      src="/src/assets/resume/odcheo_resume.pdf"
                      className="w-full h-full absolute top-0 left-0 hidden"
                      id="resume-iframe-fallback"
                      title="Resume PDF"
                      onError={() => {
                        // Show manual fallback message
                        document.getElementById('resume-fallback-message').classList.remove('hidden');
                      }}
                  />

                  {/* Manual fallback message */}
                  <div id="resume-fallback-message" className="hidden absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
                      <i className="fas fa-file-pdf text-red-500 text-4xl mb-4"></i>
                      <h4 className="text-[#111827] font-bold text-lg mb-2">PDF Viewer Not Supported</h4>
                      <p className="text-[#6b7280] mb-4 text-sm">
                        Your browser doesn't support PDF viewing. Please use one of the options below:
                      </p>
                      <div className="space-y-2">
                        <button
                            onClick={handleResumeViewInNewTab}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                        >
                          <i className="fas fa-external-link-alt"></i>
                          <span>Open in New Tab</span>
                        </button>
                        <button
                            onClick={handleResumeDownload}
                            className="w-full bg-[#9ca3af] hover:bg-[#6b7280] text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                        >
                          <i className="fas fa-download"></i>
                          <span>Download PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
      </section>
  );
}

// Experience Section with Smooth Scroll-Based Animations
function Experience() {
  const containerRef = useRef(null);

  // Use scroll-based animations with smooth progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.1"]
  });

  // Transform scroll progress to smooth opacity and position values
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50]);

  const experiences = [
    {
      title: 'Web Development Internship',
      organization: 'TMDD SLU',
      period: 'Jan 2025 - May 2025',
      description: 'Led development of a comprehensive inventory management system using PHP, featuring role-based access control and modern UI components.',
      detailedTasks: [
        {
          category: 'Database Architecture & Design',
          description: 'Designed and implemented a comprehensive MySQL database schema for inventory and asset management, ensuring optimal data structure and relationships for scalable operations.',
          icon: 'fas fa-database'
        },
        {
          category: 'Security & Authentication',
          description: 'Developed a robust role-based access control (RBAC) system with secure session-based authentication, input sanitization, and encrypted password hashing to ensure data security and user access management.',
          icon: 'fas fa-shield-alt'
        },
        {
          category: 'Frontend Development',
          description: 'Built responsive interfaces using Bootstrap, JavaScript, and CSS, featuring dynamic data tables with pagination, interactive modals, and intuitive navigation components.',
          icon: 'fas fa-laptop-code'
        },
        {
          category: 'Backend Development',
          description: 'Implemented server-side logic using PHP with comprehensive CRUD operations, data validation, and secure API endpoints for seamless data flow between frontend and database.',
          icon: 'fas fa-server'
        },
        {
          category: 'Real-time Table Updates',
          description: 'Automatically refreshed table data after each SQL CRUD operation to show changes instantly.',
          icon: 'fas fa-sync-alt'
        },
        {
          category: 'Quality Assurance & Testing',
          description: 'Conducted thorough testing of website performance, CRUD functionality, user interface elements, error handling, and data flow validation to ensure optimal system reliability.',
          icon: 'fas fa-bug'
        },
        {
          category: 'Advanced Integrations',
          description: 'Implemented document generation capabilities using DomPDF and PHPOffice libraries, and managed dependencies with Composer for enhanced functionality.',
          icon: 'fas fa-puzzle-piece'
        },
        {
          category: 'Audit & Compliance',
          description: 'Developed comprehensive logging systems to track all CRUD operations and data changes, ensuring full audit trails for inventory management compliance.',
          icon: 'fas fa-clipboard-check'
        },
        {
          category: 'UI/UX Enhancement',
          description: 'Designed user-friendly interfaces with Font Awesome icons, consistent spacing, and intuitive placement of elements, resulting in improved user engagement and workflow efficiency.',
          icon: 'fas fa-paint-brush'
        }
      ],
      skills: ['HTML','CSS','PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
      icon: 'fas fa-briefcase'
    },
    {
      title: 'Capstone Research Project',
      organization: 'SAMCIS, Saint Louis University',
      period: 'Aug 2024 - Dec 2024',
      description: 'Designed and implemented NaviBot, an AI-powered chatbot utilizing generative AI and BART models for academic assistance with 72% accuracy rate.',
      detailedTasks: [
        {
          category: 'Data Engineering & Preprocessing',
          description: 'Executed comprehensive data cleaning, processing, and augmentation workflows to prepare high-quality training datasets for machine learning model development.',
          icon: 'fas fa-cogs'
        },
        {
          category: 'Machine Learning Implementation',
          description: 'Fine-tuned a BART (Bidirectional and Auto-Regressive Transformers) model using custom datasets, implementing transfer learning techniques to adapt the pre-trained model for domain-specific enrollment queries.',
          icon: 'fas fa-brain'
        },
        {
          category: 'Machine Learning Model Evaluation',
          description: 'Implemented rigorous validation framework using industry-standard metrics: BERTScore for semantic similarity evaluation, BLEU Score for precision and quality assessment, and ROUGE Score for n-gram overlap measurement to ensure response accuracy and relevance.',
          icon: 'fas fa-chart-line'
        }
      ],
      skills: ['AI', 'Python', 'NLP', 'BART', 'Machine Learning', 'Data Science'],
      icon: 'fas fa-robot'
    },
    {
      title: 'Self-Directed Learning',
      organization: 'Professional Development',
      period: '2024 - Present',
      description: 'Continuously expanding expertise in modern web development technologies through structured self-learning and project building.',
      skills: ['React', 'Tailwind CSS', 'Vite', 'Git'],
      icon: 'fas fa-code'
    }
  ];

  // Individual experience item component with smooth scroll animations
  const ExperienceItem = ({ exp, index }) => {
    const itemRef = useRef(null);

    const { scrollYProgress: itemProgress } = useScroll({
      target: itemRef,
      offset: ["start 0.9", "end 0.1"]
    });

    // Smooth transforms for each item
    const itemOpacity = useTransform(itemProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const itemX = useTransform(itemProgress, [0, 0.2, 0.8, 1], [-100, 0, 0, -50]);
    const itemScale = useTransform(itemProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);

    // Icon rotation based on scroll
    const iconRotate = useTransform(itemProgress, [0, 0.5, 1], [0, 360, 720]);

    return (
      <motion.div
        ref={itemRef}
        className="relative flex items-start group"
        style={{ opacity: itemOpacity, x: itemX, scale: itemScale }}

      >
        <motion.div
          className="flex-shrink-0 w-16 h-16 bg-[#374151] rounded-full flex items-center justify-center relative z-10 border-4 border-[#111827] group-hover:bg-[#6b7280] transition-all duration-300 shadow-lg"
          style={{ rotate: iconRotate }}

        >
          <i className={`${exp.icon} text-[#f9fafb] text-xl`}></i>
        </motion.div>

        <motion.div
          className="ml-8 bg-[#374151]/20 backdrop-blur-sm rounded-xl p-6 border border-[#6b7280]/30 flex-1 hover:border-[#9ca3af]/50 hover:bg-[#374151]/30 transition-all duration-300 hover:shadow-lg"

        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-[#f9fafb] group-hover:text-[#9ca3af] transition-colors">
                {exp.title}
              </h3>
              <p className="text-[#9ca3af] font-medium">{exp.organization}</p>
            </div>
            <span className="text-sm text-[#9ca3af] bg-[#111827]/50 px-3 py-1 rounded-full">
              {exp.period}
            </span>
          </div>

          <p className="text-[#9ca3af] mb-4 whitespace-pre-line">{exp.description}</p>

          {/* Detailed Tasks with staggered scroll animations */}
          {exp.detailedTasks && exp.detailedTasks.length > 0 && (
            <div className="space-y-4 mb-4">
              {exp.detailedTasks.map((task, taskIndex) => {
                const taskProgress = useTransform(
                  itemProgress,
                  [0, 0.3 + (taskIndex * 0.05), 0.8, 1],
                  [0, 1, 1, 0]
                );
                const taskX = useTransform(
                  itemProgress,
                  [0, 0.3 + (taskIndex * 0.05), 0.8, 1],
                  [0, 0, 0, -20]
                );

                return (
                  <motion.div
                    key={taskIndex}
                    className="flex items-start space-x-3"
                    style={{ opacity: taskProgress, x: taskX }}
                    whileHover={{
                      x: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.i
                      className={`${task.icon} text-[#9ca3af] mt-1 text-lg`}
                      whileHover={{
                        scale: 1.2,
                        color: "#f9fafb",
                        transition: { duration: 0.2 }
                      }}
                    />
                    <div>
                      <span className="text-[#f9fafb] font-medium text-sm">{task.category}</span>
                      <p className="text-[#9ca3af] text-sm">{task.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Skills with staggered animations */}
          <div className="flex flex-wrap gap-2">
            {exp.skills.map((skill, skillIndex) => {
              const skillProgress = useTransform(
                itemProgress,
                [0, 0.5 + (skillIndex * 0.03), 0.8, 1],
                [0, 1, 1, 0]
              );
              const skillScale = useTransform(
                itemProgress,
                [0, 0.5 + (skillIndex * 0.03), 0.8, 1],
                [0.8, 1, 1, 0.9]
              );

              return (
                <motion.span
                  key={skill}
                  className="px-3 py-1 bg-[#6b7280]/30 text-[#f9fafb] text-sm rounded-full border border-[#9ca3af]/20 hover:bg-[#6b7280]/50 transition-colors"
                  style={{ opacity: skillProgress, scale: skillScale }}
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {skill}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Timeline component with smooth scroll animation
  const Timeline = () => {
    const timelineRef = useRef(null);

    const { scrollYProgress: timelineProgress } = useScroll({
      target: timelineRef,
      offset: ["start 0.9", "end 0.2"]
    });

    const timelineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

    return (
      <div ref={timelineRef} className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#6b7280]/30">
        <motion.div
          className="w-full bg-gradient-to-b from-[#6b7280] via-[#9ca3af] to-[#6b7280]"
          style={{ height: timelineHeight }}
        />
      </div>
    );
  };

  return (
    <motion.section
      ref={containerRef}
      id="experience"
      className="py-20 relative"
      style={{ opacity: sectionOpacity, y: sectionY }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6b7280] to-transparent"></div>

      <div className="container mx-auto px-6 max-w-5xl">
        <motion.h2
          className="text-4xl font-bold text-[#f9fafb] text-center mb-16"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
            y: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, 0, 0])
          }}
        >
          Experience
        </motion.h2>

        <div className="relative">
          <Timeline />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceItem key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// Projects Section with Zoomable Images
function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const projects = [
    {
      id: 'navibot',
      title: 'NaviBot AI Chatbot',
      description: 'AI-powered chatbot utilizing generative AI to handle enrollment-related FAQs with 72% accuracy rate.',
      technologies: ['AI', 'Python', 'BART', 'NLP'],
      image: thesisHomepage,
      screenshots: [
        { src: thesisHomepage, title: 'NaviBot Homepage' },
        { src: thesisChat1, title: 'Chat Interface 1' },
        { src: thesisChat2, title: 'Chat Interface 2' }
      ],
      github: 'https://github.com/Jermin-Odcheo/ChatbotNaviBot',
      category: 'AI/ML'
    },
    {
      id: 'inventory',
      title: 'Inventory Management System',
      description: 'Comprehensive inventory management system with role-based access control and real-time updates.',
      technologies: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
      image: inventoryDashboard,
      screenshots: [
        { src: inventoryDashboard, title: 'Dashboard Overview' },
        { src: inventoryLogin, title: 'Login Interface' }
      ],
      github: 'https://github.com/Jermin-Odcheo/Inventory-Management-System-TMDD',
      category: 'Web App'
    },
    {
      id: 'anime',
      title: 'Anime Fetch API',
      description: 'Web application that fetches and displays anime data using external APIs with modern UI design.',
      technologies: ['JavaScript', 'REST API', 'HTML/CSS'],
      image: animeHomepage,
      screenshots: [
        { src: animeHomepage, title: 'Anime Homepage' },
        { src: mangaHomepage, title: 'Manga Section' }
      ],
      github: 'https://github.com/JoefreyToriano/it312-9474-mt-teamburnersly/tree/main/activity_2_dom',
      category: 'Web App'
    },
    {
      id: 'crime pattern',
      title: 'Crime Pattern Analysis',
      description: 'Data mining project focused on identifying and analyzing crime patterns using clustering algorithms and visualization techniques.',
      technologies: ['Python', 'Pandas', 'Scikit-learn',' Matplotlib','Mlxtend','Tkinter'],
      image: cluster,
      screenshots: [],
      github: 'https://github.com/Jermin-Odcheo/Team-Yor-OnTrack',
      category: 'Data Mining'
    },
    {
      id: 'wordy game',
      title: 'Wordy Game',
      description: 'Wordy is a Java word game where players use a given set of letters to form the longest valid word and win by scoring the highest.',
      technologies: ['Java'],
      image: '', // No image available
      screenshots: [],
      github: 'https://github.com/Jermin-Odcheo/WordyGame',
      category: 'Game'
    }
  ];

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
    setZoomedImage(null);
  };

  const zoomImage = (imageSrc) => {
    setZoomedImage(imageSrc);
  };

  // Helper function to create placeholder image
  const createPlaceholderImage = (title, category) => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 400, 300);
    gradient.addColorStop(0, '#374151');
    gradient.addColorStop(1, '#6b7280');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 300);

    // Title text
    ctx.fillStyle = '#f9fafb';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title, 200, 140);

    // Category text
    ctx.font = '16px Arial';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText(category, 200, 170);

    // Icon (simple geometric shape)
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 3;
    ctx.strokeRect(150, 100, 100, 60);

    return canvas.toDataURL();
  };

  return (
      <motion.section
        ref={ref}
        id="projects"
        className="py-20 relative"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6b7280] to-transparent"></div>

        <div className="container mx-auto px-6 max-w-6xl">
          <motion.h2
            className="text-4xl font-bold text-[#f9fafb] text-center mb-16"
            variants={fadeInUp}
          >
            Featured Projects
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group h-full"
                  variants={fadeInUp}
                  custom={index}
                >
                  <div className="bg-[#374151]/20 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-[#374151]/30 transition-all duration-300 border border-[#6b7280]/30 hover:shadow-2xl hover:scale-105 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      {project.image ? (
                        <>
                          <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                              onClick={() => zoomImage(project.image)}
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                               onClick={() => zoomImage(project.image)}>
                            <i className="fas fa-search-plus text-white text-2xl"></i>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#374151] to-[#6b7280] flex flex-col items-center justify-center text-center p-6 group-hover:from-[#6b7280] group-hover:to-[#9ca3af] transition-all duration-300">
                          <div className="bg-[#111827]/30 rounded-full p-4 mb-3 group-hover:bg-[#111827]/50 transition-all duration-300">
                            <i className={`fas ${project.category === 'Game' ? 'fa-gamepad' : project.category === 'AI/ML' ? 'fa-brain' : project.category === 'Web App' ? 'fa-globe' : project.category === 'Data Mining' ? 'fa-chart-bar' : 'fa-code'} text-3xl text-[#f9fafb]`}></i>
                          </div>
                          <h4 className="text-[#f9fafb] font-bold text-lg mb-1">{project.title}</h4>
                          <p className="text-[#9ca3af] text-sm">{project.category}</p>
                          <div className="absolute bottom-3 right-3 text-[#9ca3af]/50 text-xs">
                            <i className="fas fa-image"></i>
                            <span className="ml-1">No preview</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#111827]/80 text-[#9ca3af] px-3 py-1 rounded-full text-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-[#f9fafb] mb-3 group-hover:text-[#9ca3af] transition-colors">{project.title}</h3>
                      <p className="text-[#9ca3af] mb-4 text-sm flex-1">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 bg-[#6b7280]/30 text-[#f9fafb] text-xs rounded border border-[#9ca3af]/20 hover:bg-[#6b7280]/50 transition-colors"
                        >
                    {tech}
                  </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        {project.details && (
                            <a
                                href={project.details}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-[#6b7280]/30 hover:bg-[#6b7280]/50 text-[#f9fafb] py-2 px-4 rounded-lg transition-all duration-300 border border-[#9ca3af]/20 hover:border-[#9ca3af]/40 hover:shadow-lg flex items-center justify-center text-sm sm:text-base gap-2"
                            >
                              View Details
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-[#6b7280]/30 hover:bg-[#6b7280]/50 text-[#f9fafb] py-2 px-4 rounded-lg transition-all duration-300 border border-[#9ca3af]/20 hover:border-[#9ca3af]/40 hover:shadow-lg flex items-center justify-center text-sm sm:text-base gap-2"
                            >
                              <i className="fab fa-github"></i>
                              <span>View on GitHub</span>
                            </a>
                        )}
                      </div>

                    </div>
                  </div>
                </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Modal with Zoomable Images */}
        {showModal && selectedProject && (
            <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-2 sm:p-4">
              <div className="bg-[#374151] rounded-xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-auto border border-[#6b7280] shadow-2xl">
                <div className="p-4 sm:p-6 border-b border-[#6b7280] flex justify-between items-center sticky top-0 bg-[#374151] z-10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#f9fafb]">{selectedProject.title}</h3>
                    <p className="text-[#9ca3af] text-xs sm:text-sm">{selectedProject.category}</p>
                  </div>
                  <button
                      onClick={closeModal}
                      className="text-[#9ca3af] hover:text-[#f9fafb] text-xl sm:text-2xl p-2 rounded-lg hover:bg-[#6b7280]/30 transition-all"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <div className="p-4 sm:p-6">
                  <p className="text-[#9ca3af] mb-4 sm:mb-6 text-sm sm:text-base">{selectedProject.description}</p>

                  <div className="space-y-4 sm:space-y-6">
                    {selectedProject.screenshots && selectedProject.screenshots.map((screenshot, index) => (
                        <div key={index} className="bg-[#111827]/50 rounded-lg p-3 sm:p-4 border border-[#6b7280]/30 hover:border-[#9ca3af]/50 transition-all duration-300">
                          <h4 className="text-[#f9fafb] font-medium mb-2 sm:mb-3 text-sm sm:text-base">{screenshot.title}</h4>
                          <div className="flex justify-center group cursor-pointer" onClick={() => zoomImage(screenshot.src)}>
                            <div className="relative">
                              <img
                                  src={screenshot.src}
                                  alt={screenshot.title}
                                  className="max-w-full max-h-64 sm:max-h-96 object-contain rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-lg">
                                <i className="fas fa-expand text-white text-lg sm:text-xl"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>

                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#6b7280]/30">
                    <h4 className="text-[#f9fafb] font-medium mb-2 sm:mb-3 text-sm sm:text-base">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                          <span
                              key={tech}
                              className="px-2 sm:px-3 py-1 bg-[#6b7280]/30 text-[#f9fafb] text-xs sm:text-sm rounded-full border border-[#9ca3af]/20 hover:bg-[#6b7280]/50 transition-colors"
                          >
                      {tech}
                    </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}

        {/* Full-Screen Zoom Modal */}
        {zoomedImage && (
            <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-60 p-4 overflow-auto" onClick={() => setZoomedImage(null)}>
              <div className="relative max-w-[90%] max-h-[90vh]">
                <img
                    src={zoomedImage}
                    alt="Zoomed view"
                    className="max-w-full max-h-[85vh] object-contain mx-auto"
                />
                <button
                    onClick={(e) => {e.stopPropagation(); setZoomedImage(null);}}
                    className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
        )}
      </motion.section>
  );
}

// Certifications Section
function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [previewCert, setPreviewCert] = useState(null);

  // Configure PDF.js worker once
  useEffect(() => {
    try {
      if (!GlobalWorkerOptions.workerPort) {
        GlobalWorkerOptions.workerPort = new PdfJsWorker();
      }
    } catch (e) {
      // Non-fatal; fallback previews will be used if worker setup fails
      console.warn('PDF.js worker setup failed, using placeholders if needed.', e);
    }
  }, []);

  // Placeholder generator if PDF render fails
  const generatePlaceholder = (title, platform, accentFrom, accentTo) => {
    const canvas = document.createElement('canvas');
    canvas.width = 640; // 16:10 ratio
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // Background
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, '#374151');
    bgGrad.addColorStop(1, '#6b7280');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Accent ribbon
    const accent = ctx.createLinearGradient(0, 0, canvas.width, 0);
    accent.addColorStop(0, accentFrom);
    accent.addColorStop(1, accentTo);
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, canvas.width, 10);

    // Title
    ctx.fillStyle = '#f9fafb';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, 190);

    // Platform subtitle
    ctx.font = '20px Arial';
    ctx.fillStyle = '#d1d5db';
    ctx.fillText(platform, canvas.width / 2, 230);

    // Subtle border
    ctx.strokeStyle = 'rgba(156, 163, 175, 0.35)';
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

    return canvas.toDataURL('image/png');
  };

  // Render a PDF page to a data URL at specified scale
  const renderPdfToDataUrl = async (fileUrl, scale = 1.2) => {
    const loadingTask = getDocument(fileUrl);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);

    await page.render({ canvasContext: context, viewport }).promise;
    const url = canvas.toDataURL('image/png');

    // Clean up to free memory
    canvas.width = 0;
    canvas.height = 0;

    return url;
  };

  // Base cert data
  const baseCertificates = [
    {
      id: 'udemy-ai',
      platform: 'Udemy',
      title: 'AI',
      file: certUdemyAI,
      icon: 'fas fa-brain',
      tag: 'Artificial Intelligence',
      colors: ['#a855f7', '#6366f1'],
      description: 'Udemy completion certificate for foundational AI concepts and practical applications.'
    },
    {
      id: 'udemy-python',
      platform: 'Udemy',
      title: 'Python',
      file: certUdemyPython,
      icon: 'fab fa-python',
      tag: 'Programming',
      colors: ['#f59e0b', '#f97316'],
      description: 'Udemy completion certificate covering Python fundamentals and real-world exercises.'
    },
    {
      id: 'udemy-web',
      platform: 'Udemy',
      title: 'Web Development',
      file: certUdemyWeb,
      icon: 'fas fa-code',
      tag: 'Frontend/Backend',
      colors: ['#3b82f6', '#06b6d4'],
      description: 'Udemy completion certificate for modern frontend and backend web development.'
    },
    {
      id: 'htb-eldoria',
      platform: 'HackTheBox',
      title: 'Tales of Eldoria',
      file: certHTB,
      icon: 'fas fa-shield-alt',
      tag: 'Cybersecurity',
      colors: ['#10b981', '#059669'],
      description: 'HackTheBox certificate for completing the Tales of Eldoria challenge series.'
    },
    {
      id: 'thm-hackfinity',
      platform: 'TryHackMe',
      title: 'Hackfinity',
      file: certTHM,
      icon: 'fas fa-lock',
      tag: 'Cybersecurity',
      colors: ['#ef4444', '#ec4899'],
      description: 'TryHackMe certificate for participating in the Hackfinity challenge event.'
    }
  ];

  // Manage certificates with previews in state
  const [certificates, setCertificates] = useState(() =>
    baseCertificates.map((c) => ({
      ...c,
      preview: generatePlaceholder(c.title, c.platform, c.colors[0], c.colors[1]),
      full: null,
      tags: [c.platform, c.tag]
    }))
  );

  // Generate real previews from PDFs on mount
  useEffect(() => {
    let isCancelled = false;

    (async () => {
      try {
        const rendered = await Promise.allSettled(
          baseCertificates.map(async (c) => {
            const preview = await renderPdfToDataUrl(c.file, 0.9); // grid preview
            const full = await renderPdfToDataUrl(c.file, 1.8);    // modal size
            return { id: c.id, preview, full };
          })
        );

        if (isCancelled) return;

        setCertificates((prev) =>
          prev.map((c) => {
            const r = rendered.find((x) => x.status === 'fulfilled' && x.value.id === c.id);
            return r ? { ...c, preview: r.value.preview, full: r.value.full } : c;
          })
        );
      } catch (e) {
        // Keep placeholders if anything fails
        console.warn('PDF rendering failed, using placeholders.', e);
      }
    })();

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.section
      ref={ref}
      id="certifications"
      className="py-20 relative"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6b7280] to-transparent"></div>

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.h2
          className="text-4xl font-bold text-[#f9fafb] text-center mb-16"
          variants={fadeInUp}
        >
          Certifications
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {certificates.map((cert, index) => (
            <motion.div key={cert.id} className="group h-full" variants={fadeInUp} custom={index}>
              <div className="bg-[#374151]/20 backdrop-blur-sm rounded-xl overflow-hidden border border-[#6b7280]/30 hover:border-[#9ca3af]/50 hover:bg-[#374151]/30 transition-all duration-300 h-full flex flex-col">
                {/* Preview image clickable */}
                <div className="relative h-40 sm:h-48 overflow-hidden cursor-pointer" onClick={() => setPreviewCert(cert)}>
                  <img
                    src={cert.preview}
                    alt={`${cert.platform} - ${cert.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <i className="fas fa-expand text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center shadow-sm`}
                      style={{ backgroundImage: `linear-gradient(135deg, ${cert.colors[0]}, ${cert.colors[1]})` }}
                      aria-hidden="true"
                    >
                      <i className={`${cert.icon} text-white text-base`}></i>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-bold text-[#f9fafb] leading-tight">{cert.title}</h3>
                      <p className="text-[#9ca3af] text-sm">{cert.platform}</p>
                    </div>
                  </div>

                  <p className="text-[#9ca3af] text-sm flex-1">{cert.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {cert.tags.map((t) => (
                      <span key={t} className="px-2 py-1 bg-[#6b7280]/30 text-[#f9fafb] text-xs rounded border border-[#9ca3af]/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Non-fullscreen preview modal */}
      {previewCert && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-60 p-4" onClick={() => setPreviewCert(null)}>
          <div
            className="bg-[#1f2937] border border-[#4b5563] rounded-xl w-full max-w-3xl max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#374151] bg-[#111827]">
              <div>
                <h4 className="text-[#f9fafb] font-semibold">{previewCert.title}</h4>
                <p className="text-[#9ca3af] text-xs">{previewCert.platform}</p>
              </div>
              <button
                onClick={() => setPreviewCert(null)}
                className="text-[#9ca3af] hover:text-[#f9fafb] p-2 rounded-lg hover:bg-[#374151]/50 transition-colors"
                aria-label="Close preview"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="bg-[#111827] flex items-center justify-center p-3">
              <img
                src={previewCert.full || previewCert.preview}
                alt={`${previewCert.platform} - ${previewCert.title} preview`}
                className="max-w-full max-h-[70vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}

// Contact Section
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // Anti-spam field
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [cooldownTime, setCooldownTime] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

    // Check for existing cooldown on component mount
    checkCooldown();
  }, []);

  // Cooldown timer effect
  useEffect(() => {
    let interval;
    if (cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldownTime]);

  const checkCooldown = () => {
    const lastSubmission = localStorage.getItem('lastEmailSubmission');
    if (lastSubmission) {
      const now = Date.now();
      const oneMinute = 1 * 60 * 1000; // Changed to 1 minute
      const timePassed = now - parseInt(lastSubmission);

      if (timePassed < oneMinute) {
        const remainingTime = Math.ceil((oneMinute - timePassed) / 1000);
        setCooldownTime(remainingTime);
      }
    }
  };

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateForm = () => {
    const newErrors = {};

    // Check honeypot (anti-spam)
    if (formData.honeypot) {
      return false; // Bot detected
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    } else if (formData.email.trim().length > 100) {
      newErrors.email = 'Email must be less than 100 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check cooldown first
    if (cooldownTime > 0) {
      setSubmitStatus('cooldown');
      return;
    }

    if (!validateForm()) {
      if (formData.honeypot) {
        // Silent fail for bots
        return;
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Rate limiting check (simple client-side protection)
      const lastSubmission = localStorage.getItem('lastEmailSubmission');
      const now = Date.now();
      const oneMinute = 1 * 60 * 1000; // Changed to 1 minute

      if (lastSubmission && (now - parseInt(lastSubmission)) < oneMinute) {
        const remainingTime = Math.ceil((oneMinute - (now - parseInt(lastSubmission))) / 1000);
        setCooldownTime(remainingTime);
        throw new Error(`Please wait ${formatTime(remainingTime)} before sending another message.`);
      }

      // Send email using EmailJS
      const templateParams = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        time: new Date().toLocaleString(),
        message: formData.message.trim(),
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('Email sent successfully:', result.text);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });

      // Store timestamp for rate limiting
      localStorage.setItem('lastEmailSubmission', now.toString());
      setCooldownTime(60); // Start 1-minute cooldown

    } catch (error) {
      console.error('Error sending email:', error);
      if (error.message.includes('Please wait')) {
        setSubmitStatus('cooldown');
      } else {
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormDisabled = isSubmitting || cooldownTime > 0;

  return (
      <motion.section
        ref={ref}
        id="contact"
        className="py-20 relative"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6b7280] to-transparent"></div>

        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-[#f9fafb] mb-8">
              Let's Connect
            </h2>
            <p className="text-[#9ca3af] text-lg mb-12">
              I'm actively seeking new opportunities and exciting projects to contribute to.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              variants={fadeInLeft}
            >
              <h3 className="text-2xl font-semibold text-[#f9fafb] mb-6">Get in Touch</h3>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-1 gap-6"
                variants={staggerContainer}
              >
                {[
                  { href: "mailto:jerminbodcheo@gmail.com", icon: "fas fa-envelope", title: "Email", description: "jerminbodcheo@gmail.com" },
                  { href: "https://linkedin.com/in/jerminodcheo", icon: "fab fa-linkedin", title: "LinkedIn", description: "Connect with me", target: "_blank" },
                  { href: "https://github.com/Jermin-Odcheo", icon: "fab fa-github", title: "GitHub", description: "View my code", target: "_blank" }
                ].map((contact, index) => (
                  <motion.a
                      key={contact.title}
                      href={contact.href}
                      target={contact.target}
                      rel={contact.target ? "noopener noreferrer" : undefined}
                      className="group bg-[#374151]/20 backdrop-blur-sm p-6 rounded-xl hover:bg-[#374151]/30 transition-all border border-[#6b7280]/30 hover:border-[#9ca3af]/50 hover:shadow-xl hover:scale-105 duration-300"
                      variants={staggerItem}
                      custom={index}
                  >
                    <i className={`${contact.icon} text-3xl text-[#9ca3af] mb-4 group-hover:text-[#f9fafb] transition-colors`}></i>
                    <h4 className="font-semibold text-[#f9fafb] mb-2">{contact.title}</h4>
                    <p className="text-[#9ca3af] group-hover:text-[#f9fafb] transition-colors">{contact.description}</p>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-[#374151]/20 backdrop-blur-sm p-8 rounded-xl border border-[#6b7280]/30"
              variants={fadeInRight}
            >
              <h3 className="text-2xl font-semibold text-[#f9fafb] mb-6">Send Message</h3>

              {/* Cooldown Warning */}
              {cooldownTime > 0 && (
                <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <i className="fas fa-clock text-yellow-400 mr-2"></i>
                      <span className="text-yellow-400 font-medium">Rate limit active</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400 text-sm">Next submission in:</span>
                      <span className="text-yellow-400 font-mono text-lg bg-yellow-500/20 px-2 py-1 rounded">
                        {formatTime(cooldownTime)}
                      </span>
                    </div>
                  </div>
                  <p className="text-yellow-300 text-sm mt-2">
                    To prevent spam, you can send one message per minute.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field for anti-spam (hidden) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-[#f9fafb] font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    maxLength="50"
                    className={`w-full px-4 py-3 bg-[#111827] border rounded-lg text-[#f9fafb] placeholder-[#9ca3af] focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : isFormDisabled
                        ? 'border-[#4b5563] bg-[#1f2937]'
                        : 'border-[#6b7280] focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Your full name"
                    disabled={isFormDisabled}
                  />
                  {errors.name && <p className="text-red-400 textsm mt-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-[#f9fafb] font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    maxLength="100"
                    className={`w-full px-4 py-3 bg-[#111827] border rounded-lg text-[#f9fafb] placeholder-[#9ca3af] focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : isFormDisabled
                        ? 'border-[#4b5563] bg-[#1f2937]'
                        : 'border-[#6b7280] focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="your.email@example.com"
                    disabled={isFormDisabled}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-[#f9fafb] font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    maxLength="1000"
                    className={`w-full px-4 py-3 bg-[#111827] border rounded-lg text-[#f9fafb] placeholder-[#9ca3af] focus:outline-none focus:ring-2 transition-all resize-vertical ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500'
                        : isFormDisabled
                        ? 'border-[#4b5563] bg-[#1f2937]'
                        : 'border-[#6b7280] focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Tell me about your project, job opportunity, or just say hello..."
                    disabled={isFormDisabled}
                  ></textarea>
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                  <p className="text-xs text-[#6b7280] mt-1">{formData.message.length}/1000 characters</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isFormDisabled}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isFormDisabled
                      ? 'bg-[#6b7280] cursor-not-allowed opacity-50'
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : cooldownTime > 0 ? (
                    <>
                      <i className="fas fa-clock"></i>
                      <span>Wait {formatTime(cooldownTime)}</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                    <p className="text-green-400 text-center">
                      <i className="fas fa-check-circle mr-2"></i>
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === 'cooldown' && (
                  <div className="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                    <p className="text-yellow-400 text-center">
                      <i className="fas fa-hourglass-half mr-2"></i>
                      Please wait before sending another message.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-400 text-center">
                      <i className="fas fa-exclamation-circle mr-2"></i>
                      There was an error sending your message. Please try again or email me directly.
                    </p>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>
  );
}

// Footer Component
function Footer() {
  return (
      <footer className="py-8 relative border-t border-[#6b7280]/30">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[#9ca3af]">&copy; 2025 Jermin Odcheo. All rights reserved.</p>
        </div>
      </footer>
  );
}

// Main App Component with Interactive Background
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
      <StrictMode>
        <div className="min-h-screen relative">
          <InteractiveBackground />

          <div className="relative z-10">
            <Navigation />
            <Hero />
            <Experience />
            <Projects />
            <Certifications />
            <Contact />
            <Footer />
          </div>
        </div>

        <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
      </StrictMode>
  );
}

// Bootstrap React
const root = createRoot(document.getElementById('root'));
root.render(<App />);
