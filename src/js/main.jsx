
// src/js/main.jsx

import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

// Hero section component
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen w-full
        bg-[linear-gradient(135deg,#111827,#374151,#111827)] overflow-hidden"
    >
      {/* Vertical grid background */}
      <div
        className="absolute inset-0 pointer-events-none
          bg-[repeating-linear-gradient(90deg,rgba(156,163,175,0.1)_1px,transparent_1px,transparent_20px)]"
      />

      {/* Animated blobs */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#9ca3af] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#6b7280] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-ping" />
        <div className="absolute bottom-8 left-20 w-72 h-72 bg-[#9ca3af] rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-bounce" />
      </div>

      {/* Content */}
      <div
        id="hero-content"
        className={`container max-w-4xl mx-auto px-8 text-center space-y-8 transform transition-all duration-1000
${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Profile Avatar */}
        <div className="relative mx-auto w-32 h-32 mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#6b7280] to-[#9ca3af] p-1 hover:scale-110 transition-transform duration-300">
            <div className="w-full h-full rounded-full bg-[#f9fafb] flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-[#111827] to-[#374151] flex items-center justify-center text-[#f9fafb] text-2xl font-bold">
                JO
              </div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#9ca3af] rounded-full border-2 border-[#f9fafb] animate-pulse" />
        </div>

        {/* Name & Location */}
        <h1 className="text-6xl md:text-7xl font-bold leading-tight text-[#f9fafb] hover:scale-105 transition-transform duration-300">
          Jermin Odcheo
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl text-[#f9fafb]">
          <span className="flex items-center gap-2 hover:text-[#d1d5db] transition-colors"><span className="fi fi-ph" /> Philippines</span>
          <span className="hidden md:block animate-pulse">•</span>
          <span className="flex items-center gap-2 hover:text-[#d1d5db] transition-colors"><span className="fi fi-au" /> Australia</span>
        </div>

        {/* Tagline */}
        <p className="text-xl max-w-2xl mx-auto leading-relaxed text-[#f9fafb]">
          <span className="font-semibold hover:text-[#d1d5db] transition-colors">Full-Stack Developer</span>
        </p>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-6 pt-8">
          {[
            { icon: <FiGithub size={24} color="white" />, label: 'GitHub', href: 'https://github.com/Jermin-Odcheo' },
            { icon: <FiLinkedin size={24} color="white" />, label: 'LinkedIn', href: 'https://linkedin.com/in/jermin-odcheo' },
            { icon: <FiMail size={24} color="white" />, label: 'Email', href: 'mailto:jermin.odcheo@email.com' }
          ].map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group relative flex items-center justify-center w-14 h-14 bg-[#f9fafb]/10 backdrop-blur-sm rounded-full border border-[#d1d5db]/30 hover:bg-[#f9fafb]/20 hover:border-[#d1d5db] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
            >
              {icon}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-[#111827] text-[#f9fafb] text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-[#111827]">
                {label}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#111827]" />
              </div>
            </a>
          ))}
        </div>

        {/* Scroll Arrow */}
        <a href="#about" className="mt-12 flex justify-center items-center animate-bounce hover:animate-pulse text-[#f9fafb] w-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}

// Main application component
function App() {
  useEffect(() => {
    // Hide loading screen
    const onLoad = () => {
      const loading = document.getElementById('loading-screen');
      if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => (loading.style.display = 'none'), 500);
      }
    };
    window.addEventListener('load', onLoad);

    // Navbar scroll & border animation
    const mainNav = document.getElementById('main-navbar');
    const floatingBar = document.querySelector('#floating-navbar > .container > div');
    const onScroll = () => {
      if (window.scrollY > 100) {
        mainNav?.classList.add('opacity-0', '-translate-y-full');
        floatingBar?.classList.remove('-translate-y-full', 'opacity-0', 'border-transparent');
        floatingBar?.classList.add('translate-y-0', 'opacity-100', 'border-b', 'border-gray-400');
      } else {
        mainNav?.classList.remove('opacity-0', '-translate-y-full');
        floatingBar?.classList.remove('translate-y-0', 'opacity-100', 'border-b', 'border-gray-400');
        floatingBar?.classList.add('-translate-y-full', 'opacity-0', 'border-transparent');
      }
    };
    window.addEventListener('scroll', onScroll);

    // Section highlight observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const link = document.querySelector(`#floating-navbar a[href="#${id}"]`);
        if (entry.isIntersecting) {
          document.querySelectorAll('#floating-navbar a').forEach((el) => el.classList.replace('text-gray-50', 'text-gray-400'));
          link?.classList.replace('text-gray-400', 'text-gray-50');
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('section[id]').forEach((sec) => observer.observe(sec));

    // Screenshot modal & lightbox setup data
    const projectScreenshots = {
      navibot: [
        { src: '/src/assets/project-screenshots/navibot/screenshot1.jpg', caption: 'NaviBot Interface' },
        { src: '/src/assets/project-screenshots/navibot/screenshot2.jpg', caption: 'Chat Interaction' }
      ],
      inventory: [
        { src: '/src/assets/internship-project/ims_login.png', caption: 'Login' },
        { src: '/src/assets/internship-project/ims_dashboard.png', caption: 'Dashboard' }
      ],
      anime: [
        { src: '/src/assets/academic-project/anime-rest-api/Anime.jpeg', caption: 'Anime Homepage' },
        { src: '/src/assets/academic-project/anime-rest-api/Manga.jpeg', caption: 'Manga Homepage' }
      ],
      portfolio: [
        { src: '/src/assets/project-screenshots/portfolio/screenshot1.jpg', caption: 'Portfolio Design' },
        { src: '/src/assets/project-screenshots/portfolio/screenshot2.jpg', caption: 'Projects Section' }
      ]
    };

    // Modal elements
    const modal = document.getElementById('screenshotModal');
    const modalTitle = document.getElementById('modalTitle');
    const container = document.getElementById('screenshotContainer');
    const screenshotBtns = document.querySelectorAll('.screenshot-btn');
    const closeModalBtn = document.getElementById('closeModal');
    const fullImageModal = document.getElementById('fullImageModal');
    const fullImage = document.getElementById('fullImage');

    // Open grid modal
    screenshotBtns.forEach((btn) => btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const shots = projectScreenshots[key] || [];
      modalTitle.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)} Screenshots`;
      container.innerHTML = '';
      shots.forEach((shot) => {
        const div = document.createElement('div');
        div.className = 'screenshot-item flex flex-col items-center';
        div.innerHTML = `
<div class="w-full max-h-[60vh] flex items-center justify-center bg-gray-800 rounded overflow-hidden cursor-zoom-in">
    <img src="${shot.src}" alt="${shot.caption}" class="max-w-full max-h-full object-contain" />
    </div>
<p class="text-center text-gray-300 mt-2">${shot.caption}</p>
    `;
        container.appendChild(div);
      });
      modal.classList.remove('hidden');
    }));

    // Close grid modal
    closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

    // Open full-res lightbox
    container.addEventListener('click', (e) => {
      const imgElem = e.target.closest('.screenshot-item img');
      if (!imgElem) return;
      fullImage.src = imgElem.src;
      fullImageModal.classList.remove('hidden');
    });

    // Close lightbox
    fullImageModal.addEventListener('click', () => fullImageModal.classList.add('hidden'));

    // Cleanup
    return () => {
      window.removeEventListener('load', onLoad);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <StrictMode>
      <Hero />
      {/* Include your modals markup in index.html or here */}
    </StrictMode>
  );
}

// Bootstrap React
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-[#9ca3af]', 'text-[#111827]');
        btn.classList.add('bg-transparent', 'text-[#f9fafb]');
      });

      // Add active class to clicked button
      button.classList.remove('bg-transparent', 'text-[#f9fafb]');
      button.classList.add('bg-[#9ca3af]', 'text-[#111827]');

      // Get selected category
      const selectedCategory = button.getAttribute('data-filter');

      // Filter projects
      projectCards.forEach(card => {
        if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});