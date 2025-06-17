import React, {StrictMode, useEffect, useState} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {FiGithub, FiLinkedin, FiMail} from 'react-icons/fi'

// Hero component
function Hero() {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <section
            id="hero"
            className="relative flex flex-col items-center justify-center min-h-screen w-full
        bg-[linear-gradient(135deg,#111827,#374151,#111827)] overflow-hidden"
        >
            {/* Vertical grid background */}
            <div className="absolute inset-0 pointer-events-none
        bg-[repeating-linear-gradient(90deg,rgba(156,163,175,0.1)_1px,transparent_1px,transparent_20px)]
      "></div>

            {/* Animated blobs */}
            <div className="absolute inset-0 w-full h-full">
                <div
                    className="absolute top-10 left-10 w-72 h-72 bg-[#9ca3af] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div
                    className="absolute top-10 right-10 w-72 h-72 bg-[#6b7280] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-ping"></div>
                <div
                    className="absolute bottom-8 left-20 w-72 h-72 bg-[#9ca3af] rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-bounce"></div>
            </div>

            {/* Content */}
            <div
                id="hero-content"
                className={`container max-w-4xl mx-auto px-8 text-center space-y-8 transform transition-all duration-1000
          ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                {/* Profile */}
                <div className="relative mx-auto w-32 h-32 mb-8">
                    <div
                        className="w-32 h-32 rounded-full bg-gradient-to-r from-[#6b7280] to-[#9ca3af] p-1 hover:scale-110 transition-transform duration-300">
                        <div className="w-full h-full rounded-full bg-[#f9fafb] flex items-center justify-center">
                            <div
                                className="w-28 h-28 rounded-full bg-gradient-to-r from-[#111827] to-[#374151] flex items-center justify-center text-[#f9fafb] text-2xl font-bold">
                                JO
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute -top-1 -right-1 w-6 h-6 bg-[#9ca3af] rounded-full border-2 border-[#f9fafb] animate-pulse"></div>
                </div>

                {/* Name & Location */}
                <h1 className="text-6xl md:text-7xl font-bold leading-tight text-[#f9fafb] hover:scale-105 transition-transform duration-300">
                    Jermin Odcheo
                </h1>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl text-[#f9fafb]">
                    <span className="flex items-center gap-2 hover:text-[#d1d5db] transition-colors"><span
                        className="fi fi-ph"></span> Philippines</span>
                    <span className="hidden md:block animate-pulse">•</span>
                    <span className="flex items-center gap-2 hover:text-[#d1d5db] transition-colors"><span
                        className="fi fi-au"></span> Australia</span>
                </div>

                {/* Tagline */}
                <p className="text-xl max-w-2xl mx-auto leading-relaxed text-[#f9fafb]">
                    <span className="font-semibold hover:text-[#d1d5db] transition-colors">Full-Stack Developer</span>
                </p>

                {/* Social */}
                <div className="flex justify-center items-center gap-6 pt-8">
                    {[
                        {icon: <FiGithub size={24} color="white"/>, label: 'GitHub', href: 'https://github.com/Jermin-Odcheo'},
                        {
                            icon: <FiLinkedin size={24} color="white"/>,
                            label: 'LinkedIn',
                            href: 'https://linkedin.com/in/jermin-odcheo'
                        },
                        {icon: <FiMail size={24} color="white"/>, label: 'Email', href: 'mailto:jermin.odcheo@email.com'}
                    ].map(({icon, label, href}) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                           className="group relative flex items-center justify-center w-14 h-14 bg-[#f9fafb]/10 backdrop-blur-sm rounded-full border border-[#d1d5db]/30 hover:bg-[#f9fafb]/20 hover:border-[#d1d5db] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                            {icon}
                            <div
                                className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-[#111827] text-[#f9fafb] text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-[#111827']">
                                {label}
                                <div
                                    className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#111827]"></div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Scroll arrow */}
                <a href="#about" className="mt-12 flex justify-center items-center animate-bounce hover:animate-pulse text-[#f9fafb] w-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                    </svg>
                </a>


            </div>
        </section>
    )
}

// App component integrating your existing scripts
function App() {
    useEffect(() => {
        // Project filtering
        const filterBtns = document.querySelectorAll('.project-filter-btn');
        const projectItems = document.querySelectorAll('.project-item');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.replace('bg-gray-800', 'bg-indigo-600') && b.classList.replace('text-gray-100', 'text-white'))
                btn.classList.replace('bg-gray-800', 'bg-indigo-600');
                btn.classList.replace('text-gray-100', 'text-white');
                const filter = btn.getAttribute('data-filter');
                projectItems.forEach(item => item.getAttribute('data-category') === filter || filter === 'all'
                    ? item.classList.remove('hidden')
                    : item.classList.add('hidden')
                );
            })
        });

        // Expand/collapse
        document.querySelectorAll('.project-expand-btn').forEach(btn => btn.addEventListener('click', () => {
            const details = btn.closest('.flex').querySelector('.project-details');
            details.classList.toggle('hidden');
            btn.querySelector('i').classList.toggle('fa-chevron-up');
            btn.querySelector('i').classList.toggle('fa-chevron-down');
        }));

        // Load animations
        window.addEventListener('load', () => {
            document.getElementById('loading-screen')?.classList.add('opacity-0');
            setTimeout(() => document.getElementById('loading-screen').style.display = 'none', 500);
        });

        // Navbar scroll
        const floating = document.querySelector('#floating-navbar > .container > div');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                document.getElementById('main-navbar')?.classList.add('opacity-0', '-translate-y-full');
                floating?.classList.add('translate-y-0', 'opacity-100');
            } else {
                document.getElementById('main-navbar')?.classList.remove('opacity-0', '-translate-y-full');
                floating?.classList.remove('translate-y-0', 'opacity-100');
            }
        });

        // Skills animation
        setTimeout(() => document.querySelectorAll('.skill-bar').forEach(bar => bar.classList.add('animate-fill')), 500);
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', () => item.style.transform = 'scale(1.02)');
            item.addEventListener('mouseleave', () => item.style.transform = 'scale(1)');
        });

        // Section highlighting
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('#floating-navbar a').forEach(link => link.classList.replace('text-gray-50', 'text-gray-400'));
                    const id = entry.target.id === 'hero' ? 'about' : entry.target.id;
                    document.querySelector(`#floating-navbar a[href="#${id}"]`)?.classList.replace('text-gray-400', 'text-gray-50');
                }
            });
        }, {threshold: 0.5});
        document.querySelectorAll('section[id]').forEach(sec => observer.observe(sec));
    }, []);

    return <Hero/>
}

// Mount
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
    </StrictMode>
)