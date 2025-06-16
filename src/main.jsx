import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Project filtering and interaction
document.addEventListener('DOMContentLoaded', function() {
    // Project filtering
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-indigo-600', 'text-white', 'shadow-indigo-600/30');
                b.classList.add('bg-gray-800', 'text-gray-100');
            });
            btn.classList.add('active', 'bg-indigo-600', 'text-white', 'shadow-indigo-600/30');
            btn.classList.remove('bg-gray-800', 'text-gray-100');

            const filter = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    // Add animation
                    item.classList.add('animate-fadeIn');
                    setTimeout(() => {
                        item.classList.remove('animate-fadeIn');
                    }, 500);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Project expand/collapse functionality
    const expandBtns = document.querySelectorAll('.project-expand-btn');

    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.closest('.flex').querySelector('.project-content');
            const details = content.querySelector('.project-details');
            const icon = btn.querySelector('i');

            details.classList.toggle('hidden');
            if (!details.classList.contains('hidden')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
});

// Loading screen and animations
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('opacity-0');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500); // Wait for fade animation to complete

    // Animate hero content
    setTimeout(() => {
        const heroContent = document.getElementById('hero-content');
        heroContent.classList.remove('opacity-0', 'translate-y-10');
    }, 700);
});

// Navbar behavior
const mainNavbar = document.getElementById('main-navbar');
const floatingIsland = document.querySelector('#floating-navbar > .container > div');
const threshold = 100;

window.addEventListener('scroll', () => {
    if (window.scrollY > threshold) {
        mainNavbar.classList.add('opacity-0', '-translate-y-full');
        floatingIsland.classList.add('translate-y-0', 'opacity-100');
    } else {
        mainNavbar.classList.remove('opacity-0', '-translate-y-full');
        floatingIsland.classList.remove('translate-y-0', 'opacity-100');
    }
});

// Skill animations
document.addEventListener('DOMContentLoaded', function () {
    const skillBars = document.querySelectorAll('.skill-bar');

    // Animate skill bars on page load
    setTimeout(() => {
        skillBars.forEach(bar => {
            bar.classList.add('animate-fill');
        });
    }, 500);

    // Add hover effects for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
});