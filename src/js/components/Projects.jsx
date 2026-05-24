// src/js/components/Projects.jsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion as Motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from './animations.js';

// Asset imports
import inventoryLogin from '../../assets/internship-project/ims_login.png';
import inventoryDashboard from '../../assets/internship-project/ims_dashboard.png';
import mediaArchive from '../../assets/academic-project/media-rest-api/MediaArchive.jpeg';

import thesisChat1 from '../../assets/thesis-project/Chat1.jpeg';
import thesisChat2 from '../../assets/thesis-project/Chat2.jpeg';
import thesisHomepage from '../../assets/thesis-project/Homepage.jpeg';
import cluster from '../../assets/academic-project/crime-pattern/cluster.png';

export default function Projects() {
  // Restore in-view tracking used by the section (prevents ref/isInView undefined runtime crash)
  const { ref, inView: isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const [zoomedImage, setZoomedImage] = useState(null);

  // Zoom state for the modal
  const [zoomScale, setZoomScale] = useState(1);
  const viewerRef = useRef(null);

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;
  const ZOOM_STEP = 0.5;

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  const resetZoom = useCallback(() => {
    setZoomScale(1);
    // Reset scroll position when resetting zoom
    if (viewerRef.current) {
      viewerRef.current.scrollTop = 0;
      viewerRef.current.scrollLeft = 0;
    }
  }, []);

  const closeModal = useCallback(() => {
    setZoomedImage(null);
    resetZoom();
  }, [resetZoom]);

  const openModal = useCallback(
    (imageSrc) => {
      setZoomedImage(imageSrc);
      setZoomScale(1);
    },
    []
  );

  // Lock body scroll + allow ESC to close when modal is open
  useEffect(() => {
    if (!zoomedImage) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [zoomedImage, closeModal]);

  const zoomImage = (imageSrc) => openModal(imageSrc);

  const applyZoom = useCallback(
    (nextScale) => {
      const clampedNext = clamp(nextScale, MIN_SCALE, MAX_SCALE);
      setZoomScale(clampedNext);
    },
    []
  );

  const onWheelZoom = (e) => {
    // Only zoom when Ctrl key is pressed (standard zoom behavior)
    // Otherwise, allow normal scrolling of the content
    if (!e.ctrlKey) {
      return; // Allow default scroll behavior
    }

    e.preventDefault();

    // Make wheel direction feel natural: wheel down => zoom out, wheel up => zoom in
    const direction = e.deltaY < 0 ? 1 : -1;
    const next = zoomScale + direction * ZOOM_STEP;

    applyZoom(next);
  };

  const projects = [
    {
      id: 'navibot',
      title: 'NaviBot AI Chatbot',
      description:
        'AI-powered chatbot utilizing generative AI to handle enrollment-related FAQs with 72% accuracy rate.',
      technologies: ['AI', 'Python', 'BART', 'NLP', 'BERT', 'ROUGE'],
      image: thesisHomepage,
      screenshots: [
        { src: thesisHomepage, title: 'NaviBot Homepage' },
        { src: thesisChat1, title: 'Chat Interface 1' },
        { src: thesisChat2, title: 'Chat Interface 2' },
      ],
      github: 'https://github.com/Jermin-Odcheo/ChatbotNaviBot',
      category: 'AI/ML',
    },
    {
      id: 'inventory',
      title: 'Inventory Management System',
      description:
        'Comprehensive inventory management system with role-based access control and real-time updates.',
      technologies: ['HTML','CSS','PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
      image: inventoryDashboard,
      screenshots: [
        { src: inventoryDashboard, title: 'Dashboard Overview' },
        { src: inventoryLogin, title: 'Login Interface' },
      ],
      github: 'https://github.com/Jermin-Odcheo/Inventory-Management-System-TMDD',
      category: 'Web App',
    },
    {
      id: 'anime',
      title: 'Anime Fetch API',
      description:
        'Web application that fetches and displays anime data using external APIs with modern UI design.',
      technologies: ['JavaScript', 'REST API', 'HTML','CSS'],
      image: mediaArchive,
      screenshots: [
        { src: mediaArchive, title: 'MediaArchives Homepage' },

      ],
      github:
        'https://github.com/Jermin-Odcheo/Anime-Manga-Fetch-API',
      liveDemo: 'https://anime-manga-fetch-api.vercel.app/',
      category: 'Web App',
    },
    {
      id: 'crime pattern',
      title: 'Crime Pattern Analysis',
      description:
        'Data mining project focused on identifying and analyzing crime patterns using clustering algorithms and visualization techniques.',
      technologies: ['Python', 'Pandas', 'Scikit-learn', ' Matplotlib', 'Mlxtend', 'Tkinter'],
      image: cluster,
      screenshots: [],
      github: 'https://github.com/Jermin-Odcheo/Team-Yor-OnTrack',
      category: 'Data Mining',
    },
    {
      id: 'wordy game',
      title: 'Wordy Game',
      description:
        'Wordy is a Java word game where players use a given set of letters to form the longest valid word and win by scoring the highest.',
      technologies: ['Java'],
      image: '', // No image available
      screenshots: [],
      github: 'https://github.com/Jermin-Odcheo/WordyGame',
      category: 'Game',
    },
  ];

  const featuredProject = projects[0];
  const secondaryProject = projects[1];
  const moreProjects = projects.slice(2);

  const orbitOrbs = [
    { id: 'orb-1', className: 'top-8 left-8', size: 'w-72 h-72', colors: 'from-[#60a5fa]/40 via-[#a78bfa]/30 to-transparent' },
    { id: 'orb-2', className: 'bottom-10 right-6', size: 'w-80 h-80', colors: 'from-[#22d3ee]/30 via-[#f472b6]/20 to-transparent' },
    { id: 'orb-3', className: 'top-1/3 -right-12', size: 'w-56 h-56', colors: 'from-[#34d399]/20 via-[#60a5fa]/25 to-transparent' },
  ];

  const lightStreaks = [
    { id: 'streak-1', className: 'top-24 left-10 w-40', rotate: '-12deg' },
    { id: 'streak-2', className: 'bottom-28 right-16 w-52', rotate: '10deg' },
  ];

  return (
    <Motion.section
      ref={ref}
      id="projects"
      className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 overflow-hidden"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative">
        <div className="text-center mb-10 sm:mb-16">
          <Motion.p
            className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[#9ca3af]"
            variants={fadeInUp}
          >
            Selected Work
          </Motion.p>
          <Motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#f9fafb] mt-3"
            variants={fadeInUp}
          >
            Featured Projects
          </Motion.h2>
          <Motion.p
            className="mt-4 text-sm sm:text-base text-[#9ca3af] max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Immersive, high-impact builds shaped by research, intelligent automation, and design-driven engineering.
          </Motion.p>
        </div>

        <Motion.div
          className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start"
          variants={staggerContainer}
        >
          <div className="grid gap-6">
            {featuredProject && (
              <Motion.article
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl shadow-[0_30px_90px_-40px_rgba(15,23,42,0.9)]"
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 via-transparent to-[#22d3ee]/10" />
                </div>
                <div className="relative">
                  <div className="relative h-52 sm:h-60 overflow-hidden">
                    <img
                      src={featuredProject.image}
                      alt={featuredProject.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onClick={() => zoomImage(featuredProject.image)}
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 text-[10px] text-white/80 bg-black/40 rounded-full border border-white/10 whitespace-nowrap">
                        {featuredProject.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-semibold text-white">
                          {featuredProject.title}
                        </h3>
                        <p className="text-sm sm:text-base text-[#9ca3af] mt-2">
                          {featuredProject.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {featuredProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/90 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href={featuredProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm border border-white/20 hover:bg-white/20 transition"
                      >
                        <i className="fab fa-github"></i>
                        Repository
                      </a>
                      {featuredProject.liveDemo && (
                        <a
                          href={featuredProject.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3b82f6]/30 text-white text-sm border border-[#60a5fa]/50 hover:bg-[#3b82f6]/50 transition"
                        >
                          <i className="fas fa-external-link-alt text-xs"></i>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Motion.article>
            )}

            {secondaryProject && (
              <Motion.article
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl"
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute -inset-px bg-gradient-to-r from-[#3b82f6]/40 via-transparent to-[#22d3ee]/40 rounded-2xl" />
                </div>
                <div className="relative p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-28 w-32 shrink-0 overflow-hidden rounded-xl border border-white/10">
                      {secondaryProject.image ? (
                        <img
                          src={secondaryProject.image}
                          alt={secondaryProject.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                          onClick={() => zoomImage(secondaryProject.image)}
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[#1f2937] to-[#374151] flex items-center justify-center text-white/60 text-xs">
                          No preview
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xl sm:text-2xl font-semibold text-white">
                          {secondaryProject.title}
                        </h3>
                        <span className="text-[10px] text-white/60 bg-white/10 px-2 py-1 rounded-full shrink-0 whitespace-nowrap">
                          {secondaryProject.category}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[#9ca3af]">
                        {secondaryProject.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {secondaryProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] rounded-full bg-white/10 text-white/80 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={secondaryProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs border border-white/20 hover:bg-white/20 transition"
                    >
                      <i className="fab fa-github"></i>
                      Repo
                    </a>
                    {secondaryProject.liveDemo && (
                      <a
                        href={secondaryProject.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3b82f6]/30 text-white text-xs border border-[#60a5fa]/50 hover:bg-[#3b82f6]/50 transition"
                      >
                        <i className="fas fa-external-link-alt text-[10px]"></i>
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </Motion.article>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {moreProjects.map((project, index) => (
              <Motion.article
                key={project.id}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl"
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute -inset-px bg-gradient-to-r from-[#3b82f6]/40 via-transparent to-[#22d3ee]/40 rounded-2xl" />
                </div>
                <div className="relative p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                          onClick={() => zoomImage(project.image)}
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[#1f2937] to-[#374151] flex items-center justify-center text-white/60 text-xs">
                          No preview
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                          {project.title}
                        </h3>
                        <span className="text-[10px] text-white/60 bg-white/10 px-2 py-1 rounded-full shrink-0 whitespace-nowrap">
                          {project.category}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[#9ca3af]">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] rounded-full bg-white/10 text-white/80 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs border border-white/20 hover:bg-white/20 transition"
                    >
                      <i className="fab fa-github"></i>
                      Repo
                    </a>
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3b82f6]/30 text-white text-xs border border-[#60a5fa]/50 hover:bg-[#3b82f6]/50 transition"
                      >
                        <i className="fas fa-external-link-alt text-[10px]"></i>
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </Motion.article>
            ))}
          </div>
        </Motion.div>
      </div>

      {/* Full-Screen Zoom Modal (zoom + pan) - 16:9 Aspect Ratio Container */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div
            className="relative w-full max-w-7xl"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '90vh' }}
          >
            {/* Toolbar */}
            <div className="mb-2 sm:mb-3 flex items-center justify-between gap-2 bg-black/70 rounded-lg p-2 sm:p-3 flex-wrap">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => applyZoom(zoomScale - ZOOM_STEP)}
                  disabled={zoomScale <= MIN_SCALE}
                  className="text-white bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-white/20 transition-colors font-medium text-sm sm:text-base"
                  aria-label="Zoom out"
                  title="Zoom out"
                >
                  <i className="fas fa-search-minus"></i>
                </button>
                <button
                  type="button"
                  onClick={() => applyZoom(zoomScale + ZOOM_STEP)}
                  disabled={zoomScale >= MAX_SCALE}
                  className="text-white bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-white/20 transition-colors font-medium text-sm sm:text-base"
                  aria-label="Zoom in"
                  title="Zoom in"
                >
                  <i className="fas fa-search-plus"></i>
                </button>
                <button
                  type="button"
                  onClick={resetZoom}
                  className="text-white bg-white/10 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-white/20 transition-colors font-medium text-sm sm:text-base"
                  aria-label="Reset zoom"
                  title="Reset zoom and position"
                >
                  <i className="fas fa-undo-alt mr-1"></i>
                  <span className="hidden xs:inline">Reset</span>
                </button>
                <div className="text-white/90 text-xs sm:text-sm bg-white/10 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 select-none font-mono">
                  {Math.round(zoomScale * 100)}%
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="text-white bg-red-600/80 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-red-600 transition-colors font-medium text-sm sm:text-base"
                aria-label="Close"
                title="Close (ESC)"
              >
                <i className="fas fa-times mr-1"></i>
                <span className="hidden xs:inline">Close</span>
              </button>
            </div>

            {/* 16:9 Aspect Ratio Container */}
            <div
              className="relative w-full bg-[#1a1a1a] rounded-lg overflow-hidden shadow-2xl"
              style={{
                aspectRatio: '16 / 9',
                maxHeight: 'calc(90vh - 60px)',
              }}
            >
              {/* Viewer surface with scroll capability */}
              <div
                className="w-full h-full overflow-auto"
                onWheel={onWheelZoom}
                style={{
                  touchAction: zoomScale > 1 ? 'none' : 'auto',
                  scrollBehavior: 'smooth'
                }}
                ref={viewerRef}
              >
                <div
                  className="min-w-full min-h-full flex items-center justify-center p-4"
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'center center',
                    transition: zoomScale === 1 ? 'transform 0.3s ease' : 'none',
                  }}
                >
                  <img
                    src={String(zoomedImage)}
                    alt="Zoomed view"
                    draggable={false}
                    className="max-w-full max-h-full object-contain select-none"
                    style={{
                      cursor: zoomScale > 1 ? 'grab' : 'default',
                    }}
                  />
                </div>
              </div>

              {/* Helper text overlay */}
              {zoomScale === 1 && (
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                  <div className="inline-block bg-black/70 text-white/80 text-xs px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm">
                    <i className="fas fa-info-circle mr-1 sm:mr-2"></i>
                    <span className="hidden sm:inline">Use zoom buttons or Ctrl+Wheel to zoom • Scroll to navigate • Click outside or ESC to close</span>
                    <span className="sm:hidden">Zoom buttons or Ctrl+Wheel • ESC to close</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Motion.section>
  );
}
