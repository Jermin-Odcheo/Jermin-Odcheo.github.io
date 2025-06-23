// src/js/main.jsx
import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import ExperienceTimeline from './ExperienceTimeline';

import inventoryLogin from '../../public/assets/internship-project/ims_login.png';
import inventoryDashboard from '../../public/assets/internship-project/ims_dashboard.png';
import animeHomepage from '../../public/assets/academic-project/anime-rest-api/Anime.jpeg';
import mangaHomepage from '../../public/assets/academic-project/anime-rest-api/Manga.jpeg';
import thesisChat1 from '../../public/assets/thesis-project/Chat1.jpeg';
import thesisChat2 from '../../public/assets/thesis-project/Chat2.jpeg';
import thesisHomepage from '../../public/assets/thesis-project/homepage.jpeg';

// Loading Screen Component
function LoadingScreen() {
  return (
      <div id="loading-screen" className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50 transition-opacity duration-500">
        <div className="flex space-x-3">
          <div className="h-4 w-4 bg-gray-50 rounded-full animate-bounce"></div>
          <div className="h-4 w-4 bg-gray-50 rounded-full animate-bounce delay-150"></div>
          <div className="h-4 w-4 bg-gray-50 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
  );
}

// Floating Navbar Component
function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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

    setTimeout(() => {
      document.querySelectorAll('section[id]').forEach((sec) => observer.observe(sec));
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Function to handle smooth scrolling without adding # to URL
  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <header>
        <div id="floating-navbar" className="fixed top-6 inset-x-0 z-50 pointer-events-none">
          <div className="container max-w-5xl mx-auto px-4 pointer-events-auto">
            <div className={`bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl px-8 py-4 w-full transform transition-all duration-300 ease-in-out border border-gray-700 flex items-center justify-between ${
                isVisible ? 'translate-y-0 opacity-100 border-b border-gray-400' : '-translate-y-full opacity-0 border-transparent'
            }`}>
              {/* Logo/Name on the left */}
              <div className="flex items-center space-x-6">
                <a
                  onClick={(e) => scrollToSection('hero', e)}
                  className="text-gray-50 font-bold text-xl cursor-pointer"
                >
                  Jermin
                </a>
                <div className="flex items-center space-x-4">
                  <a href="https://www.linkedin.com/in/jerminodcheo" target="_blank" rel="noopener noreferrer"
                     className="text-gray-400 hover:text-gray-50 transition-colors p-2 rounded-lg hover:bg-gray-800">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="https://github.com/Jermin-Odcheo" target="_blank" rel="noopener noreferrer"
                     className="text-gray-400 hover:text-gray-50 transition-colors p-2 rounded-lg hover:bg-gray-800">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="mailto:jerminbodcheo@gmail.com" target="_blank" rel="noopener noreferrer"
                     className="text-gray-400 hover:text-gray-50 transition-colors p-2 rounded-lg hover:bg-gray-800">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </div>
              </div>
              {/* Navigation links on the right */}
              <div className="flex items-center space-x-8">
                {['about', 'projects', 'contact'].map((section) => (
                    <a
                        key={section}
                        onClick={(e) => scrollToSection(section, e)}
                        className={`py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer ${
                            activeSection === section ? 'text-gray-50' : 'text-gray-400 hover:text-gray-50'
                        }`}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
  );
}

// Hero Component
function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Function to handle smooth scrolling without adding # to URL
  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <section
          id="hero"
          className="relative flex flex-col items-center justify-center min-h-screen w-full
        bg-[linear-gradient(135deg,#111827,#374151,#111827)] overflow-hidden"
      >
        {/* Vertical grid background */}
        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(90deg,rgba(156,163,175,0.1)_1px,transparent_1px,transparent_20px)]" />

        {/* Animated blobs */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#9ca3af] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute top-10 right-10 w-72 h-72 bg-[#6b7280] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-ping" />
          <div className="absolute bottom-8 left-20 w-72 h-72 bg-[#9ca3af] rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-bounce" />
        </div>

        {/* Content */}
        <div className={`container max-w-4xl mx-auto px-8 text-center space-y-8 transform transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
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
          <span className="flex items-center gap-2 hover:text-[#d1d5db] transition-colors">
            <span className="fi fi-ph" /> Philippines
          </span>
            <span className="hidden md:block animate-pulse">•</span>
            <span className="flex items-center gap-2 hover:text-[#d1d5db] transition-colors">
            <span className="fi fi-au" /> Australia
          </span>
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
                    className="group relative flex items-center justify-center w-14 h-14 bg-[#f9fafb]/10 backdrop-blur-sm rounded-full border border-[#d1d5db]/30 hover:bg-[#f9fafb]/20 hover:border-[#d1d5db]/50 hover:scale-110 transition-all duration-300"
                >
                  {icon}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-[#111827] text-[#f9fafb] text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                    {label}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#111827]" />
                  </div>
                </a>
            ))}
          </div>

          {/* Scroll Arrow */}
          <a
            onClick={(e) => scrollToSection('about', e)}
            className="mt-12 flex justify-center items-center animate-bounce hover:animate-pulse text-[#f9fafb] w-full cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>
  );
}

// Terminal About Component - FIXED VERSION
function TerminalAbout() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [completedCommands, setCompletedCommands] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);

  const commands = [
    {
      command: 'aboutme',
      output: 'I enjoy web development and aim to work as a full-stack developer, handling both front-end and back-end tasks. I am interested in AI-driven tools like chatbots for web applications to automate workflows and improve user experience.',
      type: 'text',
      color: 'text-blue-400'
    },
    {
      command: 'location',
      output: 'Philippines',
      type: 'text',
      color: 'text-blue-400'
    },
    {
      command: 'contactinfo',
      output: [
        { text: 'jerminbodcheo@gmail.com', link: 'mailto:jerminbodcheo@gmail.com' },
        { text: 'LinkedIn', link: 'https://www.linkedin.com/in/jerminodcheo' },
        { text: 'GitHub', link: 'https://github.com/Jermin-Odcheo' },
        { text: 'TryHackMe', link: 'https://tryhackme.com/p/frankenste1n' }
      ],
      type: 'links',
      color: 'text-green-400'
    },
    {
      command: 'education',
      output: '[BSIT, Saint Louis University Baguio City]',
      type: 'text',
      color: 'text-blue-400'
    },
    {
      command: 'skills',
      output: '[Python, Java, HTML, CSS, JavaScript, React, Node.js, Tailwind CSS, PHP, SQL, Git]',
      type: 'text',
      color: 'text-blue-400'
    },
    {
      command: 'hobbies',
      output: '[basketball, gaming, photography]',
      type: 'text',
      color: 'text-blue-400'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasStarted) {
              setHasStarted(true);
              setTimeout(() => setIsTyping(true), 1000);
            }
          });
        },
        { threshold: 0.3 }
    );

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!isTyping || currentCommandIndex >= commands.length) return;

    const currentCommand = commands[currentCommandIndex];
    const fullText = currentCommand.command;

    if (currentText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      }, Math.random() * 60 + 30);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCompletedCommands(prev => [...prev, currentCommand]);
        setCurrentCommandIndex(prev => prev + 1);
        setCurrentText('');
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentText, currentCommandIndex, isTyping, commands]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const renderOutput = (command, index) => {
    if (command.type === 'links') {
      return (
          <div key={`output-${index}`} className="ml-6">
            [
            {command.output.map((link, linkIndex) => (
                <span key={linkIndex}>
              <a
                  className={`${command.color} hover:underline transition-colors`}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
              >
                {link.text}
              </a>
                  {linkIndex < command.output.length - 1 && ', '}
            </span>
            ))}
            ]
          </div>
      );
    }

    return (
        <div key={`output-${index}`} className={`ml-6 ${command.color}`}>
          {command.output}
        </div>
    );
  };

  return (
      <>
        {/* Move CSS to a separate style tag */}
        <style>
          {`
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
        `}
        </style>

        <section id="about" className="min-h-screen flex flex-col py-28 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                &gt; About Me:~$ <span className="inline-block blink">▉</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Learn about me and my skills</p>
            </div>

            <div className="flex-grow flex items-center justify-center">
              <div className="w-full max-w-5xl rounded-xl shadow-2xl bg-gray-900 overflow-hidden">
                <div className="flex items-center space-x-3 bg-gray-800 px-6 py-4 border-b-2 border-gray-700">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="ml-auto font-mono text-sm text-gray-300">bash</span>
                </div>

                <div className="p-8 font-mono text-base leading-relaxed text-gray-50 space-y-4 min-h-[500px]">
                  {completedCommands.map((command, index) => (
                      <div key={`command-${index}`} className="space-y-2">
                        <div>
                          <span className="text-gray-400">jermin@portfolio</span>:~$
                          <span className="text-gray-50 ml-2">{command.command}</span>
                        </div>
                        {renderOutput(command, index)}
                      </div>
                  ))}

                  {isTyping && currentCommandIndex < commands.length && (
                      <div>
                        <span className="text-gray-400">jermin@portfolio</span>:~$
                        <span className="text-gray-50 ml-2">
                      {currentText}
                          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                        ▉
                      </span>
                    </span>
                      </div>
                  )}

                  {currentCommandIndex >= commands.length && hasStarted && (
                      <div>
                        <span className="text-gray-400">jermin@portfolio</span>:~$
                        <span className={`inline-block ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                      ▉
                    </span>
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
  );
}

// Transition Component
function TransitionSection() {
  return (
      <section className="py-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
        </div>
      </section>
  );
}

// Skills Component
function Skills() {
  const skills = [
    { name: 'Python', icon: 'fab fa-python', gradient: 'from-blue-500 to-yellow-500', shape: 'rounded-xl', animation: 'group-hover:rotate-12' },
    { name: 'Java', icon: 'fab fa-java', gradient: 'from-red-600 to-orange-500', shape: 'rounded-xl', animation: 'group-hover:rotate-45' },
    { name: 'HTML5', icon: 'fab fa-html5', gradient: 'from-orange-500 to-red-500', shape: 'rounded-full', animation: 'group-hover:scale-110' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', gradient: 'from-blue-500 to-blue-700', shape: 'rounded-xl', animation: 'group-hover:-rotate-12' },
    { name: 'JavaScript', icon: 'fab fa-js-square', gradient: 'from-yellow-400 to-yellow-600', shape: 'rounded-xl', animation: 'group-hover:rotate-12', textColor: 'text-gray-900' },
    { name: 'React', icon: 'fab fa-react', gradient: 'from-cyan-400 to-blue-500', shape: 'rounded-xl', animation: 'group-hover:rotate-45' },
    { name: 'Node.js', icon: 'fab fa-node-js', gradient: 'from-green-500 to-green-700', shape: 'rounded-full', animation: 'group-hover:scale-110' },
    { name: 'Tailwind CSS', icon: 'fa-solid fa-wind', gradient: 'from-cyan-400 to-teal-500', shape: 'rounded-xl', animation: 'group-hover:-rotate-12' },
    { name: 'PHP', icon: 'fab fa-php', gradient: 'from-indigo-600 to-purple-600', shape: 'rounded-xl', animation: 'group-hover:rotate-12' },
    { name: 'SQL', icon: 'fas fa-database', gradient: 'from-gray-600 to-gray-800', shape: 'rounded-xl', animation: 'group-hover:rotate-45' },
    { name: 'Git', icon: 'fab fa-git-alt', gradient: 'from-orange-600 to-red-600', shape: 'rounded-full', animation: 'group-hover:scale-110' }
  ];

  return (
      <section id="skills" className="min-h-screen flex flex-col justify-center py-12 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text text-transparent">&gt; Languages</span>
              <span className="text-gray-400 mx-4">&</span>
              <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text text-transparent">Tools:~$</span>
              <span className="inline-block blink text-gray-900">▉</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {skills.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="p-8 bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-1">
                    <div className={`w-16 h-16 mx-auto mb-4 ${skill.shape} bg-gradient-to-br ${skill.gradient} flex items-center justify-center transform transition-all duration-500 ${skill.animation} shadow-lg group-hover:shadow-xl`}>
                      <i className={`${skill.icon} text-2xl ${skill.textColor || 'text-white'}`}></i>
                    </div>
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}

// Projects Component
function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [fullImageModal, setFullImageModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [screenshots, setScreenshots] = useState([]);
  const [fullImage, setFullImage] = useState('');

  const projectScreenshots = {
    navibot: [
      { src: thesisChat1, caption: 'Chatbot Interface 1' },
      { src: thesisChat2, caption: 'Chatbot Interface 2' },
      {src: thesisHomepage, caption: 'NaviBot Homepage' }
    ],
    inventory: [
      { src: inventoryLogin, caption: 'Login' },
      { src: inventoryDashboard, caption: 'Dashboard' }
    ],
    anime: [
      { src: animeHomepage, caption: 'Anime Homepage' },
      { src: mangaHomepage, caption: 'Manga Homepage' }
    ]
  };

  const projects = [
    {
      id: 'navibot',
      category: 'thesis',
      featured: true,
      title: 'NaviBot Chatbot',
      subtitle: 'AI-Powered Chatbot',
      description: 'An intelligent chatbot utilizing generative AI to efficiently handle and streamline enrollment-related FAQs for the Bachelor of Science in Information Technology (BSIT) program at Saint Louis University (SLU).',
      technologies: ['Generative AI', 'Natural Language Processing', 'Python', 'BART', 'HTML/CSS'],
      github: '',
      image: thesisHomepage,
      gradient: 'from-blue-900/60 to-blue-800/60',
      buttonGradient: 'from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800',
      badgeColor: 'bg-blue-600'
    },
    {
      id: 'inventory',
      category: 'internship',
      title: 'Inventory Management System',
      subtitle: 'Web Application',
      description: 'A comprehensive inventory management system built with PHP, featuring role-based access control, real-time updates, and modern UI components for TMDD SLU.',
      technologies: [
        'HTML/CSS',
        'PHP',
        'JavaScript',
        'SQL',
        'Bootstrap',
        'WAMP/XAMPP'
      ],
      github: 'https://github.com/Jermin-Odcheo/Inventory-Management-System-TMDD',
      image: inventoryDashboard,
      gradient: 'from-green-900/60 to-green-800/60',
      buttonGradient: 'from-green-500 to-green-700 hover:from-green-600 hover:to-green-800',
      badgeColor: 'bg-green-600'
    },
    {
      id: 'anime',
      category: 'academic',
      title: 'Anime Fetch API',
      subtitle: 'Web Application',
      description: 'Display top anime, trending anime, and more (similar to MAL). A web application that fetches and displays anime data using external APIs with modern UI design.',
      technologies: ['JavaScript', 'REST API', 'HTML/CSS', 'Fetch API'],
      github: 'https://github.com/JoefreyToriano/it312-9474-mt-teamburnersly.git',
      image: animeHomepage,
      gradient: 'from-purple-900/60 to-purple-800/60',
      buttonGradient: 'from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800',
      badgeColor: 'bg-purple-600'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'thesis', label: 'Thesis Project' },
    { id: 'internship', label: 'Internship Projects' },
    { id: 'academic', label: 'Academic Projects' }
  ];

  const filteredProjects = activeFilter === 'all'
      ? projects
      : projects.filter(project => project.category === activeFilter);

  const handleScreenshotClick = (projectId) => {
    const shots = projectScreenshots[projectId] || [];
    setModalTitle(`${projectId.charAt(0).toUpperCase() + projectId.slice(1)} Screenshots`);
    setScreenshots(shots);
    setModalOpen(true);
  };

  const handleImageClick = (imageSrc) => {
    setFullImage(imageSrc);
    setFullImageModal(true);
  };

  return (
      <section id="projects" className="py-20 bg-gray-900 text-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-50 mb-4">
              &gt; My Projects:~$ <span className="inline-block blink">▉</span>
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              A collection of academic, internship, and thesis projects showcasing my development skills and experience.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-gray-800 rounded-2xl p-2 gap-2">
              {filters.map((filter) => (
                  <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-8 py-4 rounded-xl font-medium focus:outline-none transition-all duration-300 ${
                          activeFilter === filter.id
                              ? 'bg-gray-600 text-gray-100'
                              : 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                      }`}
                  >
                    {filter.label}
                  </button>
              ))}
            </div>
          </div>

          {/* Projects Container */}
          <div className="space-y-12">
            {/* Featured Project */}
            {filteredProjects.filter(p => p.featured).map((project) => (
                <div key={project.id} className="rounded-xl shadow-2xl bg-gray-800 overflow-hidden">
                  <div className="p-3 bg-gray-700 rounded-t-xl flex items-center gap-4">
                    <span className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono rounded-lg">Featured Project</span>
                    <span className={`${project.badgeColor} text-white px-4 py-2 text-sm font-mono rounded-lg`}>Thesis Project</span>
                  </div>

                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="md:col-span-2 bg-blue-900/40 flex items-center justify-center p-12 min-h-[320px] relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10`}></div>
                      {project.image && (
                          <img
                              src={project.image}
                              className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-normal"
                              alt={project.title}
                          />
                      )}
                      <div className="text-center relative z-20">

                        <h4 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">{project.title.split(' ')[0]}</h4>
                        <p className="text-blue-100 text-xl font-medium">{project.subtitle}</p>
                        <div className="mt-6 w-20 h-1 bg-blue-300 mx-auto rounded-full"></div>
                      </div>
                    </div>

                    <div className="md:col-span-3 p-8">
                      <div className="bg-gray-900 inline-block px-6 py-3 rounded-xl mb-6">
                        <h3 className="text-2xl font-bold text-blue-300">{project.title}</h3>
                      </div>

                      <p className="text-gray-300 mb-8 leading-relaxed text-lg">{project.description}</p>

                      <div className="mb-8">
                        <h4 className="text-sm font-semibold text-gray-400 mb-4">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-3">
                          {project.technologies.map((tech) => (
                              <span key={tech} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => handleScreenshotClick(project.id)}
                            className={`inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r ${project.buttonGradient} text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 focus:outline-none relative overflow-hidden group`}
                        >
                          <i className="fas fa-images"></i>
                          <span>View Screenshots</span>
                          <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                        </button>
                        <a
                            href={project.github}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 focus:outline-none relative overflow-hidden group"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          <i className="fa-brands fa-github"></i>
                          <span>View on GitHub</span>
                          <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
            ))}

            {/* Other Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.filter(p => !p.featured).map((project) => (
                  <div key={project.id} className="rounded-xl shadow-2xl bg-gray-800 h-full flex flex-col overflow-hidden">
                    <div className="p-3 bg-gray-700 rounded-t-xl">
                  <span className={`${project.badgeColor} text-white px-4 py-2 text-sm font-mono rounded-lg`}>
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)} Project
                  </span>
                    </div>

                    <div className="bg-purple-900/40 p-12 min-h-[200px] flex items-center justify-center relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} z-10`}></div>
                      {project.image && (
                          <img
                              src={project.image}
                              className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-normal"
                              alt={project.title}
                          />
                      )}
                      <div className="text-center relative z-20">
                        <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">{project.title.split(' ').slice(0, 2).join(' ')}</h3>
                        <p className="text-purple-100 text-lg font-medium">{project.subtitle}</p>
                        <div className="mt-4 w-16 h-1 bg-purple-300 mx-auto rounded-full"></div>
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                      <div className="bg-gray-900 inline-block px-6 py-3 rounded-xl mb-6">
                        <h3 className="text-xl font-bold text-purple-300">{project.title}</h3>
                      </div>

                      <p className="text-gray-300 mb-8 leading-relaxed flex-grow">{project.description}</p>

                      <div className="mb-8">
                        <h4 className="text-sm font-semibold text-gray-400 mb-4">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                              <span key={tech} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-auto">
                        <button
                            onClick={() => handleScreenshotClick(project.id)}
                            className={`inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r ${project.buttonGradient} text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 focus:outline-none relative overflow-hidden group`}
                        >
                          <i className="fas fa-images"></i>
                          <span>Screenshots</span>
                          <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                        </button>
                        <a
                            href={project.github}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 focus:outline-none relative overflow-hidden group"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          <i className="fa-brands fa-github"></i>
                          <span>GitHub</span>
                          <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                        </a>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Screenshot Grid Modal */}
        {modalOpen && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6">
              <div className="rounded-xl bg-gray-800 max-w-6xl w-full max-h-[90vh] overflow-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <h2 className="text-2xl font-bold text-white">{modalTitle}</h2>
                  <button
                      onClick={() => setModalOpen(false)}
                      className="text-gray-400 hover:text-white text-2xl p-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-6">
                  {screenshots.map((shot, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                            className="w-full max-h-[60vh] flex items-center justify-center bg-gray-800 rounded overflow-hidden cursor-zoom-in"
                            onClick={() => handleImageClick(shot.src)}
                        >
                          <img src={shot.src} alt={shot.caption} className="max-w-full max-h-full object-contain" />
                        </div>
                        <p className="text-center text-gray-300 mt-2">{shot.caption}</p>
                      </div>
                  ))}
                </div>
              </div>
            </div>
        )}

        {/* Full-Screen Image Modal */}
        {fullImageModal && (
            <div
                className="fixed inset-0 flex items-center justify-center bg-black/90 z-50 p-4"
                onClick={() => setFullImageModal(false)}
            >
              <img src={fullImage} alt="Full screenshot" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
            </div>
        )}
      </section>
  );
}

// Footer Component
function Footer() {
  // Function to handle smooth scrolling without adding # to URL
  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
        <div className="container max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand/About Section */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-gray-50 mb-6">Jermin</h3>
              <p className="mb-6 text-lg leading-relaxed">Full Stack Web Developer & AI Enthusiast passionate about creating innovative digital solutions.</p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/jerminodcheo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-50 transition-colors p-3 rounded-lg hover:bg-gray-800">
                  <i className="fa-brands fa-linkedin-in text-xl"></i>
                </a>
                <a href="https://github.com/Jermin-Odcheo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-50 transition-colors p-3 rounded-lg hover:bg-gray-800">
                  <i className="fa-brands fa-github text-xl"></i>
                </a>
                <a href="https://tryhackme.com/p/frankenste1n" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-50 transition-colors p-3 rounded-lg hover:bg-gray-800">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor">
                    <path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 0 0 -4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761a0.625 0.625 0 1 0 0 -1.25H4.761a3.273 3.273 0 0 1 -3.27 -3.27 3.273 3.273 0 0 1 3.27 -3.27c0.067 0 0.135 0.002 0.202 0.006l0.19 0.014a0.625 0.625 0 0 0 0.646 -0.49c0.38 -2.197 2.32 -3.81 4.531 -3.81 2.318 0 4.322 1.773 4.629 4.1a0.625 0.625 0 0 0 0.624 0.55h0.18a3.323 3.323 0 0 1 3.32 3.32 3.323 3.323 0 0 1 -3.32 3.32H12.84a0.625 0.625 0 1 0 0 1.25h4.723A4.573 4.573 0 0 0 22.136 9.84 4.573 4.573 0 0 0 17.563 5.267H17.18C16.308 2.264 13.751 0 10.705 0Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><a onClick={(e) => scrollToSection('about', e)} className="hover:text-gray-50 transition-colors py-2 block cursor-pointer">About</a></li>
                <li><a onClick={(e) => scrollToSection('skills', e)} className="hover:text-gray-50 transition-colors py-2 block cursor-pointer">Skills</a></li>
                <li><a onClick={(e) => scrollToSection('projects', e)} className="hover:text-gray-50 transition-colors py-2 block cursor-pointer">Projects</a></li>
            </ul>
            </div>

            {/* Contact Info */}
            <div className="col-span-1" id="contact">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-envelope text-gray-500 mt-1"></i>
                  <span>jerminbodcheo@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-location-dot text-gray-500 mt-1"></i>
                  <span>Philippines/Australia</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-500">&copy; 2025 Jermin. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}

// Main App Component
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
      <StrictMode>
        {loading && <LoadingScreen />}
        <FloatingNavbar />
        <div id="root">
          <Hero />
          <TerminalAbout />
          <TransitionSection />
          <Skills />
          <ExperienceTimeline />
          <Projects />
        </div>
        <Footer />
      </StrictMode>
  );
}

// Bootstrap React
const root = createRoot(document.getElementById('root'));
root.render(<App />);

