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
      technologies: ['AI', 'Python', 'BART', 'NLP'],
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
      technologies: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
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
      technologies: ['JavaScript', 'REST API', 'HTML/CSS'],
      image: mediaArchive,
      screenshots: [
        { src: mediaArchive, title: 'MediaArchives Homepage' },

      ],
      github:
        'https://github.com/Jermin-Odcheo/Anime-Manga-Fetch-API',
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

  return (
    <Motion.section
      ref={ref}
      id="projects"
      className="py-20 relative"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6b7280] to-transparent"></div>

      <div className="container mx-auto px-6 max-w-6xl">
        <Motion.h2 className="text-4xl font-bold text-[#f9fafb] text-center mb-16" variants={fadeInUp}>
          Featured Projects
        </Motion.h2>

        <Motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
          {projects.map((project, index) => (
            <Motion.div key={project.id} className="group h-full" variants={fadeInUp} custom={index}>
              <div className="bg-[#374151]/20 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-[#374151]/30 transition-all duration-300 border border-[#6b7280]/30 hover:shadow-2xl hover:scale-105 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                        onClick={() => zoomImage(project.image)}
                      />
                      <div
                        className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                        onClick={() => zoomImage(project.image)}
                      >
                        <i className="fas fa-search-plus text-white text-2xl"></i>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#374151] to-[#6b7280] flex flex-col items-center justify-center text-center p-6 group-hover:from-[#6b7280] group-hover:to-[#9ca3af] transition-all duration-300">
                      <div className="bg-[#111827]/30 rounded-full p-4 mb-3 group-hover:bg-[#111827]/50 transition-all duration-300">
                        <i
                          className={`fas ${
                            project.category === 'Game'
                              ? 'fa-gamepad'
                              : project.category === 'AI/ML'
                                ? 'fa-brain'
                                : project.category === 'Web App'
                                  ? 'fa-globe'
                                  : project.category === 'Data Mining'
                                    ? 'fa-chart-bar'
                                    : 'fa-code'
                          } text-3xl text-[#f9fafb]`}
                        ></i>
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
                  <h3 className="text-xl font-bold text-[#f9fafb] mb-3 group-hover:text-[#9ca3af] transition-colors">
                    {project.title}
                  </h3>
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
            </Motion.div>
          ))}
        </Motion.div>
      </div>

      {/* Full-Screen Zoom Modal (zoom + pan) - 16:9 Aspect Ratio Container */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
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
            <div className="mb-3 flex items-center justify-between gap-2 bg-black/70 rounded-lg p-3">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => applyZoom(zoomScale - ZOOM_STEP)}
                  disabled={zoomScale <= MIN_SCALE}
                  className="text-white bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg px-4 py-2 hover:bg-white/20 transition-colors font-medium"
                  aria-label="Zoom out"
                  title="Zoom out"
                >
                  <i className="fas fa-search-minus"></i>
                </button>
                <button
                  type="button"
                  onClick={() => applyZoom(zoomScale + ZOOM_STEP)}
                  disabled={zoomScale >= MAX_SCALE}
                  className="text-white bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg px-4 py-2 hover:bg-white/20 transition-colors font-medium"
                  aria-label="Zoom in"
                  title="Zoom in"
                >
                  <i className="fas fa-search-plus"></i>
                </button>
                <button
                  type="button"
                  onClick={resetZoom}
                  className="text-white bg-white/10 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors font-medium"
                  aria-label="Reset zoom"
                  title="Reset zoom and position"
                >
                  <i className="fas fa-undo-alt mr-1"></i>
                  Reset
                </button>
                <div className="text-white/90 text-sm bg-white/10 rounded-lg px-4 py-2 select-none font-mono">
                  {Math.round(zoomScale * 100)}%
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="text-white bg-red-600/80 rounded-lg px-4 py-2 hover:bg-red-600 transition-colors font-medium"
                aria-label="Close"
                title="Close (ESC)"
              >
                <i className="fas fa-times mr-1"></i>
                Close
              </button>
            </div>

            {/* 16:9 Aspect Ratio Container */}
            <div
              className="relative w-full bg-[#1a1a1a] rounded-lg overflow-hidden shadow-2xl"
              style={{
                aspectRatio: '16 / 9',
                maxHeight: 'calc(90vh - 80px)',
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
                    src={zoomedImage}
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
                  <div className="inline-block bg-black/70 text-white/80 text-xs px-4 py-2 rounded-full backdrop-blur-sm">
                    <i className="fas fa-info-circle mr-2"></i>
                    Use zoom buttons or Ctrl+Wheel to zoom • Scroll to navigate • Click outside or ESC to close
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
