// src/js/main.jsx
import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';

// Import images
import inventoryLogin from '../../public/assets/internship-project/ims_login.png';
import inventoryDashboard from '../../public/assets/internship-project/ims_dashboard.png';
import animeHomepage from '../../public/assets/academic-project/anime-rest-api/Anime.jpeg';
import mangaHomepage from '../../public/assets/academic-project/anime-rest-api/Manga.jpeg';
import thesisChat1 from '../../public/assets/thesis-project/Chat1.jpeg';
import thesisChat2 from '../../public/assets/thesis-project/Chat2.jpeg';
import thesisHomepage from '../../public/assets/thesis-project/homepage.jpeg';

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
  };

  return (
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="bg-[#111827]/90 backdrop-blur-md rounded-full px-6 py-3 border border-[#374151] shadow-2xl">
          <div className="flex items-center space-x-8">
            <button
                onClick={(e) => scrollToSection('hero', e)}
                className="text-[#f9fafb] font-bold text-lg hover:text-[#9ca3af] transition-colors"
            >
              Jermin
            </button>

            <div className="flex space-x-6">
              {['experience', 'projects', 'contact'].map((section) => (
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
        </div>
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
    { name: 'Git', icon: 'fab fa-git-alt', color: 'from-orange-600 to-red-600' }
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
    link.href = '/path/to/your/resume.pdf'; // Replace with actual resume path
    link.download = 'Jermin_Odcheo_Resume.pdf';
    link.click();
  };

  return (
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
        <div className="container mx-auto px-6 relative z-10">
          {/* Two Column Layout for Desktop, Single Column for Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

            {/* Left Column - Main Introduction */}
            <div className="text-center lg:text-left space-y-8">
              {/* Employment Status Badge */}
              <div className="flex justify-center lg:justify-start">
                <div className="bg-green-500/20 border border-green-500/50 rounded-full px-6 py-2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  <span className="text-green-400 font-medium text-sm">Available for Employment</span>
                </div>
              </div>

              {/* Avatar */}
              <div className="flex justify-center lg:justify-start">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#374151] to-[#6b7280] p-1 hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-[#f9fafb] flex items-center justify-center">
                    <span className="text-4xl font-bold text-[#111827]">JO</span>
                  </div>
                </div>
              </div>

              {/* Name and Title */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-[#f9fafb] mb-4 animate-fade-in">
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
              </div>

              {/* Professional Summary */}
              <div className="bg-[#374151]/20 backdrop-blur-sm rounded-xl p-6 border border-[#6b7280]/30">
                <h3 className="text-[#f9fafb] font-semibold mb-3 flex items-center">
                  <i className="fas fa-user mr-2"></i>
                  Professional Summary
                </h3>
                <p className="text-[#9ca3af] leading-relaxed">
                  I'm a full-stack developer skilled in modern web technologies and AI integration. I'm eager to build scalable web applications and contribute to innovative projects with a dynamic team.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-4">
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
              </div>
            </div>

            {/* Right Column - Skills & Education */}
            <div className="space-y-8">
              {/* Technical Skills */}
              <div className="bg-[#374151]/20 backdrop-blur-sm rounded-xl p-6 border border-[#6b7280]/30">
                <h3 className="text-[#f9fafb] font-semibold mb-6 flex items-center text-lg">
                  <i className="fas fa-code mr-2"></i>
                  Technical Skills
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                      <div
                          key={skill.name}
                          className="group flex items-center space-x-3 bg-[#111827]/30 rounded-lg px-3 py-2 hover:bg-[#6b7280]/30 transition-all duration-300"
                          style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className={`w-6 h-6 rounded bg-gradient-to-r ${skill.color} flex items-center justify-center flex-shrink-0`}>
                          <i className={`${skill.icon} text-white text-xs`}></i>
                        </div>
                        <span className="text-[#f9fafb] font-medium text-sm">{skill.name}</span>
                      </div>
                  ))}
                </div>
              </div>

              {/* Education & Certifications */}
              <div className="bg-[#374151]/20 backdrop-blur-sm rounded-xl p-6 border border-[#6b7280]/30">
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
              </div>

              {/* Key Achievements */}
              <div className="bg-[#374151]/20 backdrop-blur-sm rounded-xl p-6 border border-[#6b7280]/30">
                <h3 className="text-[#f9fafb] font-semibold mb-4 flex items-center text-lg">
                  <i className="fas fa-trophy mr-2"></i>
                  Key Achievements
                </h3>
                <div className="space-y-3">
                  {[
                    'Developed AI chatbot with 72% accuracy rate',
                    'Led inventory management system development',
                    'Completed full-stack web development projects',
                    'Active contributor to open-source projects'
                  ].map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <i className="fas fa-check-circle text-green-400 mt-1 text-sm"></i>
                        <span className="text-[#9ca3af] text-sm">{achievement}</span>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2">
            <button
                onClick={() => scrollToSection('experience')}
                className="animate-bounce hover:animate-pulse transition-all duration-300 cursor-pointer group">
              <div className="flex flex-col items-center space-y-2">
                <span className="text-[#9ca3af] text-sm group-hover:text-[#f9fafb] transition-colors">Explore My Work</span>
                <i className="fas fa-chevron-down text-[#9ca3af] text-xl group-hover:text-[#f9fafb] transition-colors"></i>
              </div>
            </button>
          </div>
        </div>

        {/* Resume Modal */}
        {showResume && (
            <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
              <div className="bg-[#374151] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-[#6b7280] shadow-2xl">
                <div className="p-6 border-b border-[#6b7280] flex justify-between items-center sticky top-0 bg-[#374151] z-10">
                  <div>
                    <h3 className="text-2xl font-bold text-[#f9fafb]">Resume - Jermin Odcheo</h3>
                    <p className="text-[#9ca3af] text-sm">Full-Stack Developer</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                        onClick={handleResumeDownload}
                        className="flex items-center space-x-2 bg-[#9ca3af] hover:bg-[#f9fafb] text-[#111827] px-4 py-2 rounded-lg transition-colors"
                    >
                      <i className="fas fa-download"></i>
                      <span>Download</span>
                    </button>
                    <button
                        onClick={() => setShowResume(false)}
                        className="text-[#9ca3af] hover:text-[#f9fafb] text-2xl p-2 rounded-lg hover:bg-[#6b7280]/30 transition-all"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Resume Content - You can replace this with an embedded PDF or detailed resume content */}
                  <div className="bg-[#f9fafb] text-[#111827] p-8 rounded-lg min-h-[600px]">
                    <div className="text-center mb-8">
                      <h1 className="text-3xl font-bold mb-2">Jermin Odcheo</h1>
                      <p className="text-lg text-[#6b7280] mb-4">Full-Stack Developer</p>
                      <div className="flex justify-center space-x-6 text-sm text-[#6b7280]">
                        <span>📧 jerminbodcheo@gmail.com</span>
                        <span>📍 Philippines/Australia</span>
                        <span>💼 Available for Employment</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <section>
                        <h2 className="text-xl font-bold border-b-2 border-[#111827] pb-2 mb-4">Professional Summary</h2>
                        <p className="text-[#6b7280]">
                          Recent BSIT graduate with hands-on experience in full-stack web development, AI integration,
                          and modern web technologies. Proven ability to develop scalable applications and innovative solutions.
                        </p>
                      </section>

                      <section>
                        <h2 className="text-xl font-bold border-b-2 border-[#111827] pb-2 mb-4">Education</h2>
                        <div className="mb-4">
                          <h3 className="font-semibold">Bachelor of Science in Information Technology</h3>
                          <p className="text-[#6b7280]">Saint Louis University, Baguio City • 2020-2024</p>
                        </div>
                      </section>

                      <section>
                        <h2 className="text-xl font-bold border-b-2 border-[#111827] pb-2 mb-4">Technical Skills</h2>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Frontend</h4>
                            <p className="text-[#6b7280] text-sm">HTML5/CSS3, JavaScript, React, Tailwind CSS</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Backend</h4>
                            <p className="text-[#6b7280] text-sm">Node.js, PHP, Python, SQL</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Languages</h4>
                            <p className="text-[#6b7280] text-sm">Python, Java, JavaScript, PHP</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Tools</h4>
                            <p className="text-[#6b7280] text-sm">Git, WAMP/XAMPP, Bootstrap</p>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h2 className="text-xl font-bold border-b-2 border-[#111827] pb-2 mb-4">Experience</h2>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold">Web Development Intern</h3>
                            <p className="text-[#6b7280] text-sm">TMDD SLU • Jan 2025 - May 2025</p>
                            <ul className="list-disc list-inside text-[#6b7280] text-sm mt-2">
                              <li>Led development of comprehensive inventory management system</li>
                              <li>Implemented role-based access control and real-time updates</li>
                              <li>Utilized PHP, JavaScript, MySQL, and Bootstrap</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="font-semibold">Capstone Research Project</h3>
                            <p className="text-[#6b7280] text-sm">SAMCIS, Saint Louis University • Aug 2024 - Dec 2024</p>
                            <ul className="list-disc list-inside text-[#6b7280] text-sm mt-2">
                              <li>Designed and implemented NaviBot AI-powered chatbot</li>
                              <li>Achieved 72% accuracy rate using generative AI and BART models</li>
                              <li>Specialized in academic assistance and FAQ handling</li>
                            </ul>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
      </section>
  );
}

// Experience Section
function Experience() {
  const experiences = [
    {
      title: 'Web Development Internship',
      organization: 'TMDD SLU',
      period: 'Jan 2025 - May 2025',
      description: 'Led development of a comprehensive inventory management system using PHP, featuring role-based access control and modern UI components.',
      skills: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
      icon: 'fas fa-briefcase'
    },
    {
      title: 'Capstone Research Project',
      organization: 'SAMCIS, Saint Louis University',
      period: 'Aug 2024 - Dec 2024',
      description: 'Designed and implemented NaviBot, an AI-powered chatbot utilizing generative AI and BART models for academic assistance.',
      skills: ['AI', 'Python', 'NLP', 'BART'],
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

  return (
      <section id="experience" className="py-20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6b7280] to-transparent"></div>

        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-[#f9fafb] text-center mb-16">
            Experience
          </h2>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#6b7280] via-[#9ca3af] to-[#6b7280] opacity-50"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                  <div key={index} className="relative flex items-start group">
                    <div className="flex-shrink-0 w-16 h-16 bg-[#374151] rounded-full flex items-center justify-center relative z-10 border-4 border-[#111827] group-hover:bg-[#6b7280] transition-all duration-300 shadow-lg">
                      <i className={`${exp.icon} text-[#f9fafb] text-xl`}></i>
                    </div>

                    <div className="ml-8 bg-[#374151]/20 backdrop-blur-sm rounded-xl p-6 border border-[#6b7280]/30 flex-1 hover:border-[#9ca3af]/50 hover:bg-[#374151]/30 transition-all duration-300 hover:shadow-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#f9fafb] group-hover:text-[#9ca3af] transition-colors">{exp.title}</h3>
                          <p className="text-[#9ca3af] font-medium">{exp.organization}</p>
                        </div>
                        <span className="text-sm text-[#9ca3af] bg-[#111827]/50 px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                      </div>

                      <p className="text-[#9ca3af] mb-4">{exp.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1 bg-[#6b7280]/30 text-[#f9fafb] text-sm rounded-full border border-[#9ca3af]/20 hover:bg-[#6b7280]/50 transition-colors"
                            >
                        {skill}
                      </span>
                        ))}
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}

// Projects Section with Zoomable Images
function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

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
      github: 'https://github.com/JoefreyToriano/it312-9474-mt-teamburnersly.git',
      category: 'Web App'
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

  return (
      <section id="projects" className="py-20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6b7280] to-transparent"></div>

        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-[#f9fafb] text-center mb-16">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <div key={project.id} className="group" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="bg-[#374151]/20 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-[#374151]/30 transition-all duration-300 border border-[#6b7280]/30 hover:border-[#9ca3af]/50 hover:shadow-2xl hover:scale-105">
                    <div className="relative h-48 overflow-hidden">
                      <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                          onClick={() => zoomImage(project.image)}
                      />
                      <div className="absolute top-4 left-4">
                    <span className="bg-[#111827]/80 text-[#9ca3af] px-3 py-1 rounded-full text-sm">
                      {project.category}
                    </span>
                      </div>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                           onClick={() => zoomImage(project.image)}>
                        <i className="fas fa-search-plus text-white text-2xl"></i>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#f9fafb] mb-3 group-hover:text-[#9ca3af] transition-colors">{project.title}</h3>
                      <p className="text-[#9ca3af] mb-4 text-sm">{project.description}</p>

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

                      <div className="flex space-x-3">
                        <button
                            onClick={() => openModal(project)}
                            className="flex-1 bg-[#9ca3af]/20 hover:bg-[#9ca3af]/30 text-[#f9fafb] font-medium py-2 px-4 rounded-lg transition-all duration-300 border border-[#9ca3af]/30 hover:border-[#9ca3af]/50 hover:shadow-lg"
                        >
                          View Details
                        </button>
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#6b7280]/30 hover:bg-[#6b7280]/50 text-[#f9fafb] p-2 rounded-lg transition-all duration-300 border border-[#9ca3af]/20 hover:border-[#9ca3af]/40 hover:shadow-lg"
                            >
                              <i className="fab fa-github"></i>
                            </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>

        {/* Enhanced Modal with Zoomable Images */}
        {showModal && selectedProject && (
            <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
              <div className="bg-[#374151] rounded-xl max-w-6xl w-full max-h-[90vh] overflow-auto border border-[#6b7280] shadow-2xl">
                <div className="p-6 border-b border-[#6b7280] flex justify-between items-center sticky top-0 bg-[#374151] z-10">
                  <div>
                    <h3 className="text-2xl font-bold text-[#f9fafb]">{selectedProject.title}</h3>
                    <p className="text-[#9ca3af] text-sm">{selectedProject.category}</p>
                  </div>
                  <button
                      onClick={closeModal}
                      className="text-[#9ca3af] hover:text-[#f9fafb] text-2xl p-2 rounded-lg hover:bg-[#6b7280]/30 transition-all"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <div className="p-6">
                  <p className="text-[#9ca3af] mb-6">{selectedProject.description}</p>

                  <div className="space-y-6">
                    {selectedProject.screenshots.map((screenshot, index) => (
                        <div key={index} className="bg-[#111827]/50 rounded-lg p-4 border border-[#6b7280]/30 hover:border-[#9ca3af]/50 transition-all duration-300">
                          <h4 className="text-[#f9fafb] font-medium mb-3">{screenshot.title}</h4>
                          <div className="flex justify-center group cursor-pointer" onClick={() => zoomImage(screenshot.src)}>
                            <div className="relative">
                              <img
                                  src={screenshot.src}
                                  alt={screenshot.title}
                                  className="max-w-full max-h-96 object-contain rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-lg">
                                <i className="fas fa-expand text-white text-xl"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#6b7280]/30">
                    <h4 className="text-[#f9fafb] font-medium mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                          <span
                              key={tech}
                              className="px-3 py-1 bg-[#6b7280]/30 text-[#f9fafb] text-sm rounded-full border border-[#9ca3af]/20 hover:bg-[#6b7280]/50 transition-colors"
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
      </section>
  );
}

// Contact Section
function Contact() {
  return (
      <section id="contact" className="py-20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6b7280] to-transparent"></div>

        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#f9fafb] mb-8">
            Let's Connect
          </h2>
          <p className="text-[#9ca3af] text-lg mb-12">
            I'm actively seeking new opportunities and exciting projects to contribute to.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
                href="mailto:jerminbodcheo@gmail.com"
                className="group bg-[#374151]/20 backdrop-blur-sm p-6 rounded-xl hover:bg-[#374151]/30 transition-all border border-[#6b7280]/30 hover:border-[#9ca3af]/50 hover:shadow-xl hover:scale-105 duration-300"
            >
              <i className="fas fa-envelope text-3xl text-[#9ca3af] mb-4 group-hover:text-[#f9fafb] transition-colors"></i>
              <h3 className="font-semibold text-[#f9fafb] mb-2">Email</h3>
              <p className="text-[#9ca3af] group-hover:text-[#f9fafb] transition-colors">jerminbodcheo@gmail.com</p>
            </a>

            <a
                href="https://linkedin.com/in/jerminodcheo"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#374151]/20 backdrop-blur-sm p-6 rounded-xl hover:bg-[#374151]/30 transition-all border border-[#6b7280]/30 hover:border-[#9ca3af]/50 hover:shadow-xl hover:scale-105 duration-300"
            >
              <i className="fab fa-linkedin text-3xl text-[#9ca3af] mb-4 group-hover:text-[#f9fafb] transition-colors"></i>
              <h3 className="font-semibold text-[#f9fafb] mb-2">LinkedIn</h3>
              <p className="text-[#9ca3af] group-hover:text-[#f9fafb] transition-colors">Connect with me</p>
            </a>

            <a
                href="https://github.com/Jermin-Odcheo"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#374151]/20 backdrop-blur-sm p-6 rounded-xl hover:bg-[#374151]/30 transition-all border border-[#6b7280]/30 hover:border-[#9ca3af]/50 hover:shadow-xl hover:scale-105 duration-300"
            >
              <i className="fab fa-github text-3xl text-[#9ca3af] mb-4 group-hover:text-[#f9fafb] transition-colors"></i>
              <h3 className="font-semibold text-[#f9fafb] mb-2">GitHub</h3>
              <p className="text-[#9ca3af] group-hover:text-[#f9fafb] transition-colors">View my code</p>
            </a>
          </div>
        </div>
      </section>
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

