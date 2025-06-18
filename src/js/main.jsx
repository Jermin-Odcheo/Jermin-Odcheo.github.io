import React, {StrictMode, useEffect, useState} from 'react'
import {createRoot} from 'react-dom/client'
import '../index.css'
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
const projectData = {
    navibot: {
        title: "NaviBot Chatbot Screenshots",
        screenshots: [
            {
                url: "/src/assets/screenshots/navibot/dashboard.png",
                title: "Main Dashboard",
                description: "The main chatbot interface with conversation history"
            },
            {
                url: "/src/assets/screenshots/navibot/chat-interface.png",
                title: "Chat Interface",
                description: "Real-time conversation with AI responses"
            },
            {
                url: "/src/assets/screenshots/navibot/admin-panel.png",
                title: "Admin Panel",
                description: "Administrative controls and analytics"
            },
            {
                url: "/src/assets/screenshots/navibot/settings.png",
                title: "Settings Configuration",
                description: "Bot configuration and customization options"
            }
        ]
    },
    inventory: {
        title: "Inventory Management System Screenshots",
        screenshots: [
            {
                url: "/src/assets/screenshots/inventory/login.png",
                title: "Login Page",
                description: "Secure authentication with role-based access"
            },
            {
                url: "/src/assets/screenshots/inventory/dashboard.png",
                title: "Main Dashboard",
                description: "Overview of inventory statistics and metrics"
            },
            {
                url: "/src/assets/screenshots/inventory/products.png",
                title: "Product Management",
                description: "Add, edit, and manage inventory items"
            },
            {
                url: "/src/assets/screenshots/inventory/reports.png",
                title: "Reports & Analytics",
                description: "Detailed reports and inventory analytics"
            }
        ]
    },
    anime: {
        title: "Anime Fetch API Screenshots",
        screenshots: [
            {
                url: "/src/assets/academic-project/anime-rest-api/Anime.jpeg",
                title: "Homepage",
                description: "Featured and trending anime displays"
            }
        ]
    },
    portfolio: {
        title: "Portfolio Website Screenshots",
        screenshots: [
            {
                url: "/src/assets/screenshots/portfolio/hero.png",
                title: "Hero Section",
                description: "Landing page with introduction and navigation"
            },
            {
                url: "/src/assets/screenshots/portfolio/projects.png",
                title: "Projects Section",
                description: "Showcase of development projects"
            },
            {
                url: "/src/assets/screenshots/portfolio/skills.png",
                title: "Skills & Technologies",
                description: "Technical skills and competencies"
            },
            {
                url: "/src/assets/screenshots/portfolio/contact.png",
                title: "Contact Form",
                description: "Contact information and message form"
            }
        ]
    }
};

// Projects configuration
const projects = [
    {
        id: 'navibot',
        category: 'thesis',
        title: 'NaviBot Chatbot',
        description: 'An intelligent chatbot utilizing generative AI to efficiently handle and streamline enrollment-related FAQs for the Bachelor of Science in Information Technology (BSIT) program at Saint Louis University (SLU).',
        technologies: ['Generative AI', 'Natural Language Processing', 'Chatbot Framework', 'Python', 'BART', 'HTML/CSS'],
        gradient: 'from-blue-900 to-blue-800',
        accent: 'blue',
        type: 'Featured Project',
        subtype: 'Thesis Project',
        githubUrl: '#',
        isFeatured: true
    },
    {
        id: 'inventory',
        category: 'internship',
        title: 'Inventory Management System',
        description: 'A inventory management system built with PHP, featuring role-based access control, real-time updates, and modern UI components for TMDD SLU.',
        technologies: ['PHP', 'JavaScript', 'MySQL', 'HTML/CSS', 'Bootstrap'],
        gradient: 'from-green-900 to-green-700',
        accent: 'green',
        type: 'Internship Project',
        githubUrl: '#',
        isFeatured: false
    },
    {
        id: 'anime',
        category: 'academic',
        title: 'Anime Fetch API',
        description: 'Display top anime, trending anime, and etc (similar to MAL). A web application that fetches and displays anime data using external APIs with modern UI design.',
        technologies: ['JavaScript', 'REST API', 'HTML/CSS', 'Fetch API'],
        gradient: 'from-purple-900 to-purple-700',
        accent: 'purple',
        type: 'Academic Project',
        backgroundImage: '/src/assets/academic-project/anime-rest-api/Anime.jpeg',
        githubUrl: 'https://github.com/JoefreyToriano/it312-9474-mt-teamburnersly.git',
        isFeatured: false
    },
    {
        id: 'portfolio',
        category: 'academic',
        title: 'Portfolio Website',
        description: 'A personal portfolio website showcasing my projects, skills, and experience. Built with modern web technologies and featuring a clean, responsive design.',
        technologies: ['HTML/CSS', 'JavaScript', 'Tailwind CSS', 'React', 'Vite'],
        gradient: 'from-orange-900 to-orange-700',
        accent: 'orange',
        type: 'Personal Project',
        githubUrl: '#',
        isFeatured: false
    }
];

// Filter configuration
const filterOptions = [
    { key: 'all', label: 'All Projects' },
    { key: 'thesis', label: 'Thesis Project' },
    { key: 'internship', label: 'Internship Projects' },
    { key: 'academic', label: 'Academic Projects' }
];

// Custom hooks for localStorage management
const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
};

// Screenshot Modal Component
const ScreenshotModal = ({ selectedProject, onClose }) => {
    const [expandedImage, setExpandedImage] = useState(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            if (expandedImage) {
                setExpandedImage(null);
            } else {
                onClose();
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [expandedImage]);

    const project = projectData[selectedProject];
    if (!project) return null;

    return (
        <>
            {/* Main Modal */}
            <div
                className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <div className="bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors duration-300 p-2 hover:bg-gray-700 rounded-lg"
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {project.screenshots.map((screenshot, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-all duration-300 transform hover:scale-[1.02]"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="aspect-video bg-gray-600 relative overflow-hidden group cursor-pointer">
                                        <img
                                            src={screenshot.url}
                                            alt={screenshot.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            onClick={() => setExpandedImage(screenshot)}
                                            onError={(e) => {
                                                e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%236b7280'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23f9fafb' font-family='monospace' font-size='16'%3EScreenshot Coming Soon%3C/text%3E%3C/svg%3E`;
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                            <i className="fas fa-expand text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl drop-shadow-lg"></i>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-lg font-semibold text-white mb-2">{screenshot.title}</h4>
                                        <p className="text-gray-300 text-sm leading-relaxed">{screenshot.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Image Modal */}
            {expandedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-95 z-[60] flex items-center justify-center p-4"
                    onClick={(e) => e.target === e.currentTarget && setExpandedImage(null)}
                >
                    <div className="relative max-w-7xl max-h-full">
                        <button
                            onClick={() => setExpandedImage(null)}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-3 transition-all duration-300 hover:bg-opacity-75"
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>
                        <img
                            src={expandedImage.url}
                            alt={expandedImage.title}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-zoomIn"
                        />
                        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg max-w-md">
                            <h5 className="font-semibold text-lg">{expandedImage.title}</h5>
                            <p className="text-sm text-gray-300 mt-1">{expandedImage.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Project Card Component
const ProjectCard = ({ project, likes, likedProjects, onLike, onScreenshot }) => {
    const isLiked = likedProjects.has(project.id);

    const handleLike = () => {
        onLike(project.id);

        // Create floating heart animation
        const event = { currentTarget: document.querySelector(`[data-project="${project.id}"].like-btn`) };
        if (event.currentTarget && !isLiked) {
            createFloatingHeart(event.currentTarget);
        }
    };

    const createFloatingHeart = (button) => {
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart text-red-500 text-lg"></i>';
        heart.className = 'absolute pointer-events-none z-50 animate-bounce';

        const rect = button.getBoundingClientRect();
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = rect.top + 'px';
        heart.style.position = 'fixed';

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.transform = 'translateY(-50px)';
            heart.style.opacity = '0';
            heart.style.transition = 'all 1s ease-out';
        }, 100);

        setTimeout(() => {
            if (document.body.contains(heart)) {
                document.body.removeChild(heart);
            }
        }, 1100);
    };

    if (project.isFeatured) {
        return (
            <div className="mb-12">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-1.5 bg-gray-700 flex items-center">
                        <span className="bg-gray-800 text-gray-200 px-3 py-1 text-sm font-mono rounded">
                            {project.type}
                        </span>
                        {project.subtype && (
                            <span className="ml-2 bg-gray-800 text-gray-300 px-3 py-1 text-sm font-mono rounded">
                                {project.subtype}
                            </span>
                        )}
                    </div>
                    <div className="grid md:grid-cols-5 gap-0">
                        {/* Project Header */}
                        <div className={`md:col-span-2 bg-gradient-to-br ${project.gradient} flex items-center justify-center p-8 min-h-[280px] border-r border-gray-700`}>
                            <div className="text-center">
                                <h4 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                                    {project.title.split(' ')[0]}
                                </h4>
                                <p className={`text-${project.accent}-100 text-lg font-medium`}>
                                    AI-Powered Chatbot
                                </p>
                                <div className={`mt-4 w-16 h-1 bg-${project.accent}-300 mx-auto rounded-full shadow-md`}></div>
                            </div>
                        </div>

                        {/* Project Details */}
                        <div className="md:col-span-3 p-8 bg-gray-800">
                            <div className="bg-gray-900 inline-block px-4 py-2 rounded-lg mb-4">
                                <h3 className={`text-2xl font-bold text-${project.accent}-300`}>
                                    {project.title}
                                </h3>
                            </div>

                            <p className="text-gray-300 mb-6 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Technologies */}
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-400 mb-3">Technologies Used:</h4>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 items-center">
                                <button
                                    onClick={() => onScreenshot(project.id)}
                                    className={`inline-flex items-center bg-${project.accent}-600 hover:bg-${project.accent}-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 font-medium`}
                                >
                                    <i className="fas fa-images mr-2"></i>
                                    View Screenshots
                                </button>
                                <button
                                    onClick={handleLike}
                                    data-project={project.id}
                                    className={`like-btn inline-flex items-center transition-all duration-300 ${
                                        isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                                    }`}
                                >
                                    <i className={`${isLiked ? 'fas' : 'far'} fa-heart mr-2`}></i>
                                    <span>{likes[project.id]}</span>
                                </button>
                                <a
                                    href={project.githubUrl}
                                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-github mr-2"></i>
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="transition-all duration-500 ease-in-out">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 flex flex-col h-[520px] hover:shadow-xl transition-all duration-300">
                <div className="p-1.5 bg-gray-700 flex items-center">
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 text-sm font-mono rounded">
                        {project.type}
                    </span>
                </div>

                {/* Project Header */}
                <div
                    className={`${
                        project.backgroundImage
                            ? `bg-[url('${project.backgroundImage}')] bg-cover`
                            : `bg-gradient-to-br ${project.gradient}`
                    } p-8 border-b border-gray-700 relative overflow-hidden min-h-[160px]`}
                >
                    {project.backgroundImage && (
                        <div className="absolute inset-0 bg-black opacity-70"></div>
                    )}
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                            {project.title}
                        </h3>
                        <p className={`text-${project.accent}-100 font-medium`}>
                            {project.id === 'inventory' ? 'Web Application' :
                                project.id === 'anime' ? 'Web Application' : 'Personal Website'}
                        </p>
                        <div className={`mt-4 w-16 h-1 bg-${project.accent}-300 rounded-full shadow-lg`}></div>
                    </div>
                </div>

                <div className="p-8 bg-gray-800 flex-1 flex flex-col">
                    <div className="bg-gray-900 inline-block px-4 py-2 rounded-lg mb-4">
                        <h3 className={`text-xl font-bold text-${project.accent}-300`}>
                            {project.title}
                        </h3>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                        {project.description}
                    </p>

                    <div className="mb-6">
                        <h4 className="text-md font-mono text-gray-200 mb-3">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs font-mono">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 items-center mt-auto">
                        <button
                            onClick={() => onScreenshot(project.id)}
                            className={`inline-flex items-center bg-${project.accent}-600 hover:bg-${project.accent}-700 text-white px-3 py-2 rounded-lg transition-colors duration-300 text-sm font-medium`}
                        >
                            <i className="fas fa-images mr-2"></i>
                            Screenshots
                        </button>
                        <button
                            onClick={handleLike}
                            data-project={project.id}
                            className={`like-btn inline-flex items-center transition-all duration-300 text-sm ${
                                isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                            }`}
                        >
                            <i className={`${isLiked ? 'fas' : 'far'} fa-heart mr-1`}></i>
                            <span>{likes[project.id]}</span>
                        </button>
                        <a
                            href={project.githubUrl}
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-github mr-2"></i>
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Project Showcase Component
const ProjectShowcase = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [likes, setLikes] = useLocalStorage('projectLikes', {
        navibot: 42,
        inventory: 28,
        anime: 35,
        portfolio: 52
    });
    const [likedProjects, setLikedProjects] = useLocalStorage('likedProjects', new Set());

    // Convert array back to Set if needed (localStorage converts Set to array)
    useEffect(() => {
        if (Array.isArray(likedProjects)) {
            setLikedProjects(new Set(likedProjects));
        }
    }, []);

    const openScreenshotModal = (projectId) => {
        setSelectedProject(projectId);
    };

    const closeScreenshotModal = () => {
        setSelectedProject(null);
    };

    const toggleLike = (projectId) => {
        const isLiked = likedProjects.has(projectId);
        const newLikedProjects = new Set(likedProjects);
        const newLikes = { ...likes };

        if (isLiked) {
            newLikedProjects.delete(projectId);
            newLikes[projectId] = likes[projectId] - 1;
        } else {
            newLikedProjects.add(projectId);
            newLikes[projectId] = likes[projectId] + 1;
        }

        setLikedProjects(newLikedProjects);
        setLikes(newLikes);
    };

    const filterProjects = (filter) => {
        setActiveFilter(filter);
    };

    const filteredProjects = projects.filter(project =>
        activeFilter === 'all' || project.category === activeFilter
    );

    const featuredProjects = filteredProjects.filter(p => p.isFeatured);
    const regularProjects = filteredProjects.filter(p => !p.isFeatured);

    return (
        <>
            <section id="projects" className="py-28 bg-gray-900 text-gray-50">
                <div className="container mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-4xl font-bold text-gray-50 mb-4">
                            {"> My Projects:~$ "}
                            <span className="inline-block animate-pulse">▉</span>
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            A collection of academic, internship, and thesis projects showcasing my development skills and experience.
                        </p>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex bg-gray-700 rounded-full divide-x divide-gray-500 overflow-hidden">
                            {filterOptions.map((filter, index) => (
                                <button
                                    key={filter.key}
                                    onClick={() => filterProjects(filter.key)}
                                    className={`px-6 py-3 tracking-wide font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                                        index === 0 ? 'rounded-l-full' : ''
                                    } ${
                                        index === filterOptions.length - 1 ? 'rounded-r-full' : ''
                                    } ${
                                        activeFilter === filter.key
                                            ? 'bg-gray-400 text-gray-900'
                                            : 'bg-transparent text-gray-100 hover:bg-gray-400 hover:text-gray-900'
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Projects Container */}
                    <div className="mt-8 container mx-auto">
                        {/* Featured Projects */}
                        {featuredProjects.map(project => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                likes={likes}
                                likedProjects={likedProjects}
                                onLike={toggleLike}
                                onScreenshot={openScreenshotModal}
                            />
                        ))}

                        {/* Regular Projects Grid */}
                        {regularProjects.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {regularProjects.map(project => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        likes={likes}
                                        likedProjects={likedProjects}
                                        onLike={toggleLike}
                                        onScreenshot={openScreenshotModal}
                                    />
                                ))}
                            </div>
                        )}

                        {/* No projects message */}
                        {filteredProjects.length === 0 && (
                            <div className="text-center py-16">
                                <i className="fas fa-folder-open text-6xl text-gray-600 mb-4"></i>
                                <h3 className="text-2xl font-bold text-gray-400 mb-2">No projects found</h3>
                                <p className="text-gray-500">Try selecting a different filter</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Screenshot Modal */}
            {selectedProject && (
                <ScreenshotModal
                    selectedProject={selectedProject}
                    onClose={closeScreenshotModal}
                />
            )}

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes zoomIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-in-out;
                }
                
                .animate-zoomIn {
                    animation: zoomIn 0.3s ease-out;
                }
            `}</style>
        </>
    );
};
// Screenshot functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('screenshotModal');
    const closeModal = document.getElementById('closeModal');
    const screenshotBtns = document.querySelectorAll('.screenshot-btn');
    const screenshotContainer = document.getElementById('screenshotContainer');
    const modalTitle = document.getElementById('modalTitle');

    // Project screenshots data (you'll need to add your actual screenshot paths)
    const projectScreenshots = {
        navibot: [
            { src: '/src/assets/project-screenshots/navibot/screenshot1.jpg', caption: 'NaviBot Interface' },
            { src: '/src/assets/project-screenshots/navibot/screenshot2.jpg', caption: 'Chat Interaction' }
        ],
        inventory: [
            { src: '/src/assets/project-screenshots/inventory/screenshot1.jpg', caption: 'Dashboard' },
            { src: '/src/assets/project-screenshots/inventory/screenshot2.jpg', caption: 'Inventory List' }
        ],
        anime: [
            { src: '/src/assets/academic-project/anime-rest-api/Anime.jpeg', caption: 'Anime Homepage' },
            { src: 'src/assets/academic-project/anime-rest-api/Manga.jpeg', caption: 'Manga Homepage' }
        ],
        portfolio: [
            { src: '/src/assets/project-screenshots/portfolio/screenshot1.jpg', caption: 'Portfolio Design' },
            { src: '/src/assets/project-screenshots/portfolio/screenshot2.jpg', caption: 'Projects Section' }
        ]
    };

    // Open modal with project screenshots
    screenshotBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const project = btn.getAttribute('data-project');
            const screenshots = projectScreenshots[project];

            // Set modal title
            modalTitle.textContent = `${project.charAt(0).toUpperCase() + project.slice(1)} Screenshots`;

            // Clear previous screenshots
            screenshotContainer.innerHTML = '';

            // Add screenshots to modal
            screenshots.forEach(screenshot => {
                const screenshotEl = document.createElement('div');
                screenshotEl.className = 'screenshot-item';
                screenshotEl.innerHTML = `
          <img src="${screenshot.src}" alt="${screenshot.caption}" class="object-contain max-h-full max-w-full">
          <p class="text-center text-gray-300 mt-2">${screenshot.caption}</p>
        `;
                screenshotContainer.appendChild(screenshotEl);
            });

            // Show modal
            modal.classList.remove('hidden');
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});
export default ProjectShowcase;