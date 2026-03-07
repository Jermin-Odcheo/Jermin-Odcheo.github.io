import React, { StrictMode, useEffect, useRef, useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { useInView } from 'react-intersection-observer';
import { motion as Motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs.js';
import '../index.css';

// Shared components/utilities
import { AnimatedSection, StaggeredContainer, AppReadyContext, HeroAnimated } from './components/Animated.jsx';
import InteractiveBackground from './components/InteractiveBackground.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight, staggerItem } from './components/animations.js';

// Lazy-loaded sections
const Experience = React.lazy(() => import('./components/Experience.jsx'));
const Projects = React.lazy(() => import('./components/Projects.jsx'));
const Certifications = React.lazy(() => import('./components/Certifications.jsx'));

// Assets
import profileImageUrl from '../assets/profile/profile.png';
import resumePdf from '../assets/resume/odcheo_resume.pdf';

function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);

      // Get all sections
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'hero';

      // Find which section is currently in view
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        // Section is considered active if its top is in the upper half of the viewport
        // or if we're near the bottom of the page
        if (sectionTop <= window.innerHeight / 3 && sectionTop + sectionHeight > window.innerHeight / 3) {
          currentSection = section.id;
        }
      });

      // Handle the last section (contact) when near bottom of page
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (pageHeight - scrollPosition < 100) {
        currentSection = 'contact';
      }

      setActiveSection(currentSection);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Offset for fixed navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 px-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      <div className="bg-[#111827]/90 backdrop-blur-md rounded-full px-3 sm:px-6 py-2 sm:py-3 border border-[#374151] shadow-2xl">
        {/* Desktop */}
        <div className="hidden sm:flex items-center space-x-8">
          <button onClick={e => scrollToSection('hero', e)} className="text-[#f9fafb] font-bold text-lg hover:text-[#9ca3af] transition-colors">Jermin</button>
          <div className="flex space-x-6">
            {['experience', 'projects', 'certifications', 'contact'].map(section => (
              <button key={section} onClick={e => scrollToSection(section, e)} className={`px-3 py-1 rounded-full text-sm transition-all ${activeSection === section ? 'bg-[#374151] text-[#f9fafb]' : 'text-[#9ca3af] hover:text-[#f9fafb] hover:bg-[#374151]/50'}`}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {/* Mobile */}
        <div className="sm:hidden flex items-center justify-between">
          <button onClick={e => scrollToSection('hero', e)} className="text-[#f9fafb] font-bold text-base hover:text-[#9ca3af] transition-colors">Jermin</button>
          <button onClick={() => setIsMobileMenuOpen(o => !o)} className="text-[#f9fafb] p-2 hover:text-[#9ca3af] transition-colors">
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 mt-2 bg-[#111827]/95 backdrop-blur-md rounded-xl border border-[#374151] shadow-2xl overflow-hidden">
          {['experience', 'projects', 'certifications', 'contact'].map(section => (
            <button key={section} onClick={e => scrollToSection(section, e)} className={`w-full text-left px-4 py-3 transition-all border-b border-[#374151]/50 last:border-b-0 ${activeSection === section ? 'bg-[#374151] text-[#f9fafb]' : 'text-[#9ca3af] hover:text-[#f9fafb] hover:bg-[#374151]/50'}`}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [showResume, setShowResume] = useState(false);
  const [pdfLoadError, setPdfLoadError] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(true);

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
    { name: 'WordPress', icon: 'fab fa-wordpress', color: 'from-blue-600 to-blue-800' },
    { name: 'Jo', icon: 'fab fa-drupal', color: 'from-green-600 to-green-800' },
    { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: 'from-purple-600 to-indigo-700' },
    { name: 'Express.js', icon: 'fab fa-node', color: 'from-green-500 to-green-700' },
    { name: 'Flask', icon: 'fab fa-python', color: 'from-red-400 to-red-600' },
    { name: 'REST API', icon: 'fas fa-cogs', color: 'from-blue-500 to-green-500' },
    { name: 'MySQL', icon: 'fab fa-server', color: 'from-blue-500 to-blue-700' },
    { name: 'pandas', icon: 'fab fa-python', color: 'from-green-400 to-green-600' },
    { name: 'scikit-learn', icon: 'fab fa-python', color: 'from-yellow-500 to-orange-600' },
    { name: 'PyTorch', icon: 'fab fa-python', color: 'from-red-600 to-pink-800' },
    { name: 'XAMPP', icon: 'fab fa-x', color: 'from-red-500 to-black' },
    { name: 'WAMP', icon: 'fab fa-w', color: 'from-yellow-400 to-yellow-600' },
    { name: 'VirtualBox', icon: 'fab fa-box', color: 'from-indigo-600 to-blue-800' }
  ];

  // --- Skill grouping (category by skill name) ---
  const skillCategoryByName = {
    JavaScript: 'languages',
    Python: 'languages',
    Java: 'languages',
    PHP: 'languages',

    'HTML5/CSS3': 'frontend',
    React: 'frontend',
    'Tailwind CSS': 'frontend',
    Bootstrap: 'frontend',

    'Node.js': 'backend',
    'Express.js': 'backend',
    Flask: 'backend',
    'REST API': 'backend',

    MySQL: 'databases',
    SQL: 'databases',

    NumPy: 'data & ML',
    pandas: 'data & ML',
    'scikit-learn': 'data & ML',
    PyTorch: 'data & ML',

    Git: 'tools',
    GitHub: 'tools',
    'VS Code': 'tools',
    'Jupyter Notebook': 'tools',

    XAMPP: 'platforms',
    WAMP: 'platforms',
    WordPress: 'platforms',
    Joomla: 'platforms',
    VirtualBox: 'platforms',
  }


  const categories = [
    { key: 'languages', title: 'Languages' },
    { key: 'frontend', title: 'Frontend' },
    { key: 'backend', title: 'Backend' },
    { key: 'databases', title: 'Databases' },
    { key: 'tools', title: 'Tools' },
    { key: 'platforms', title: 'Platforms / CMS' },
  ];

  const groupedSkills = categories.map(cat => ({
    ...cat,
    items: skills.filter(s => skillCategoryByName[s.name] === cat.key),
  }));

  const scrollToSection = sectionId =>
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });

  const handleResumeView = () => {
    setShowResume(true);
    setPdfLoadError(false);
    setIsPdfLoading(true);

    // Check if PDF loaded after a timeout
    setTimeout(() => {
      setIsPdfLoading(false);
    }, 2000);
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'odcheo_resume.pdf';
    link.click();
  };

  const handleResumeViewInNewTab = () => window.open(resumePdf, '_blank');

  const handlePdfError = () => {
    setPdfLoadError(true);
    setIsPdfLoading(false);
  };

  return (
      <section id="hero" className="min-h-screen lg:h-screen flex flex-col relative overflow-visible lg:overflow-hidden">
        <div className="flex-1 flex items-center container mx-auto px-8 lg:px-12 relative z-10 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full max-w-7xl mx-auto">
            <HeroAnimated animation="fadeInLeft" className="text-center lg:text-left space-y-6">
              <HeroAnimated delay={200} className="flex justify-center lg:justify-start">
                <div className="bg-green-500/20 border border-green-500/50 rounded-full px-5 py-2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  <span className="text-green-400 font-medium text-sm">Available for Employment</span>
                </div>
              </HeroAnimated>

              <HeroAnimated animation="scaleIn" delay={400} className="flex justify-center lg:justify-start">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#374151] to-[#6b7280] p-1 hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-[#f9fafb] flex items-center justify-center">
                    <img src={profileImageUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  </div>
                </div>

                <HeroAnimated delay={600} className="flex items-center space-x-3 ml-5">
                  {[
                    { icon: 'fab fa-github', href: 'https://github.com/Jermin-Odcheo', label: 'GitHub', color: 'hover:bg-gray-700' },
                    { icon: 'fab fa-linkedin', href: 'https://linkedin.com/in/jerminodcheo', label: 'LinkedIn', color: 'hover:bg-blue-600' },
                    { icon: 'fas fa-envelope', href: 'mailto:jerminbodcheo@gmail.com', label: 'Email', color: 'hover:bg-red-600' },
                  ].map(({ icon, href, label, color }) => (
                      <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className={`w-11 h-11 rounded-full bg-[#374151] ${color} text-[#f9fafb] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl border border-[#6b7280]/30`}
                      >
                        <i className={`${icon} text-base`}></i>
                      </a>
                  ))}
                </HeroAnimated>
              </HeroAnimated>

              <HeroAnimated delay={500}>
                <h1 className="text-4xl lg:text-5xl font-bold text-[#f9fafb] mb-2">Jermin Odcheo</h1>
                <div className="h-[2px] bg-blue-50 mx-auto lg:mx-0 w-48 my-2"></div>
                <p className="text-xl lg:text-2xl text-[#9ca3af] mb-3">Full-Stack Developer</p>
                <div className="flex items-center justify-center lg:justify-start space-x-4 text-[#6b7280] text-sm">
                  <div className="flex items-center space-x-1.5">
                    <i className="fas fa-map-marker-alt text-xs"></i>
                    <span>Philippines/Australia</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <i className="fas fa-graduation-cap text-xs"></i>
                    <span>BSIT Graduate</span>
                  </div>
                </div>
              </HeroAnimated>

              <HeroAnimated delay={700} className="bg-[#374151]/20 backdrop-blur-sm rounded-xl p-5 border border-[#6b7280]/30">
                <h3 className="text-[#f9fafb] font-semibold mb-2 flex items-center text-base">
                  <i className="fas fa-user mr-2"></i>Summary
                </h3>
                <p className="text-[#9ca3af] leading-relaxed text-sm justify-center">
                  IT graduate from Saint Louis University with hands-on full-stack and AI experience. Led the development of a production-ready inventory system with role-based access and real-time CRUD during my TMDD internship. I fine-tuned NaviBot, an AI chatbot using BART models to handle enrollment-related questions. Skilled in React, PHP, and Python, with experience in machine learning, data analytics, and scalable solutions.</p>
              </HeroAnimated>

              <HeroAnimated delay={900} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
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
              </HeroAnimated>
            </HeroAnimated>

            <HeroAnimated animation="fadeInRight" className="space-y-5">
              {/* --- Technical Skills (Compact) --- */}
              <HeroAnimated delay={300} className="bg-[#374151]/20 backdrop-blur-sm rounded-xl p-5 border border-[#6b7280]/30">
                <h3 className="text-[#f9fafb] font-semibold mb-4 flex items-center text-base">
                  <i className="fas fa-code mr-2"></i>Technical Skills
                </h3>

                <div className="space-y-3">
                  {groupedSkills
                      .filter(cat => cat.items.length > 0)
                      .map(cat => (
                          <div key={cat.key}>
                            <h4 className="text-[#9ca3af] text-xs font-medium mb-2 uppercase tracking-wide">{cat.title}</h4>

                            <StaggeredContainer className="flex flex-wrap gap-2">
                              {cat.items.map(skill => (
                                  <div
                                      key={skill.name}
                                      className="group flex items-center space-x-2 bg-[#111827]/30 rounded-md px-2.5 py-1.5 hover:bg-[#6b7280]/30 transition-all duration-300"
                                  >
                                    <div className={`w-5 h-5 rounded bg-gradient-to-r ${skill.color} flex items-center justify-center flex-shrink-0`}>
                                      <i className={`${skill.icon} text-white text-[11px]`}></i>
                                    </div>
                                    <span className="text-[#f9fafb] font-medium text-sm">{skill.name}</span>
                                  </div>
                              ))}
                            </StaggeredContainer>
                          </div>
                      ))}
                </div>
              </HeroAnimated>

              {/* Education & Achievements Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HeroAnimated delay={500} className="bg-[#374151]/20 backdrop-blur-sm rounded-xl p-4 border border-[#6b7280]/30">
                  <h3 className="text-[#f9fafb] font-semibold mb-3 flex items-center text-base">
                    <i className="fas fa-graduation-cap mr-2"></i>Education
                  </h3>
                  <div className="border-l-2 border-[#9ca3af]/30 pl-3">
                    <h4 className="text-[#f9fafb] font-medium text-sm">BS Information Technology</h4>
                    <p className="text-[#9ca3af] text-xs">Saint Louis University</p>
                    <p className="text-[#6b7280] text-xs">2021 - 2025</p>
                  </div>
                </HeroAnimated>

                <HeroAnimated delay={700} className="bg-[#374151]/20 backdrop-blur-sm rounded-xl p-4 border border-[#6b7280]/30">
                  <h3 className="text-[#f9fafb] font-semibold mb-3 flex items-center text-base">
                    <i className="fas fa-trophy mr-2"></i>Key Achievements
                  </h3>
                  <StaggeredContainer className="space-y-2">
                    {[
                      'AI chatbot with 72% accuracy',
                      'Led inventory system development',
                      'Full-stack web projects',
                    ].map((achievement, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <i className="fas fa-check-circle text-green-400 mt-0.5 text-xs"></i>
                          <span className="text-[#9ca3af] text-xs">{achievement}</span>
                        </div>
                    ))}
                  </StaggeredContainer>
                </HeroAnimated>
              </div>
            </HeroAnimated>
          </div>
        </div>

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
                  {/* Loading State */}
                  {isPdfLoading && !pdfLoadError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#f9fafb]">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                          <p className="text-[#6b7280] font-medium">Loading PDF...</p>
                        </div>
                      </div>
                  )}

                  {/* PDF Viewer - Try object first, then iframe as fallback */}
                  {!pdfLoadError && (
                      <object
                          data={`${resumePdf}#toolbar=1&navpanes=1&scrollbar=1`}
                          type="application/pdf"
                          className="w-full h-full"
                          onLoad={() => setIsPdfLoading(false)}
                          onError={handlePdfError}
                      >
                        <iframe
                            src={`${resumePdf}#toolbar=1&navpanes=1&scrollbar=1`}
                            className="w-full h-full"
                            title="Resume PDF"
                            onLoad={() => setIsPdfLoading(false)}
                            onError={handlePdfError}
                        />
                      </object>
                  )}

                  {/* Fallback Message - Only shown when there's an actual error */}
                  {pdfLoadError && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#f9fafb]">
                        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
                          <i className="fas fa-file-pdf text-blue-500 text-4xl mb-4"></i>
                          <h4 className="text-[#111827] font-bold text-lg mb-2">View PDF</h4>
                          <p className="text-[#6b7280] mb-4 text-sm">
                            Unable to display PDF in browser. Please use one of the options below:
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
                  )}
                </div>
              </div>
            </div>
        )}
      </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [cooldownTime, setCooldownTime] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    checkCooldown();
  }, []);

  useEffect(() => {
    let interval;
    if (cooldownTime > 0) {
      interval = setInterval(() => setCooldownTime(prev => (prev <= 1 ? 0 : prev - 1)), 1000);
    }
    return () => clearInterval(interval);
  }, [cooldownTime]);

  const checkCooldown = () => {
    const last = localStorage.getItem('lastEmailSubmission');
    if (!last) return;
    const oneMinute = 60 * 1000;
    const passed = Date.now() - parseInt(last);
    if (passed < oneMinute) setCooldownTime(Math.ceil((oneMinute - passed) / 1000));
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateForm = () => {
    const newErrors = {};
    if (formData.honeypot) return false;
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';
    else if (formData.name.trim().length > 50) newErrors.name = 'Name must be less than 50 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email.trim())) newErrors.email = 'Please enter a valid email address';
    else if (formData.email.trim().length > 100) newErrors.email = 'Email must be less than 100 characters';

    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    else if (formData.message.trim().length > 1000) newErrors.message = 'Message must be less than 1000 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const formatTime = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  const handleSubmit = async e => {
    e.preventDefault();
    if (cooldownTime > 0) return setSubmitStatus('cooldown');
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('');
    try {
      const last = localStorage.getItem('lastEmailSubmission');
      const now = Date.now();
      const oneMinute = 60 * 1000;
      if (last && now - parseInt(last) < oneMinute) {
        const remaining = Math.ceil((oneMinute - (now - parseInt(last))) / 1000);
        setCooldownTime(remaining);
        throw new Error(`Please wait ${formatTime(remaining)} before sending another message.`);
      }

      const templateParams = { name: formData.name.trim(), email: formData.email.trim(), time: new Date().toLocaleString(), message: formData.message.trim() };
      await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams, EMAILJS_CONFIG.PUBLIC_KEY);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
      localStorage.setItem('lastEmailSubmission', now.toString());
      setCooldownTime(60);
    } catch (err) {
      setSubmitStatus(err.message?.includes('Please wait') ? 'cooldown' : 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormDisabled = isSubmitting || cooldownTime > 0;

  return (
    <Motion.section ref={ref} id="contact" className="py-20 relative" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6b7280] to-transparent"></div>
      <div className="container mx-auto px-6 max-w-6xl">
        <Motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl font-bold text-[#f9fafb] mb-8">Let's Connect</h2>
          <p className="text-[#9ca3af] text-lg mb-12">I'm actively seeking new opportunities and exciting projects to contribute to.</p>
        </Motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Motion.div className="space-y-8" variants={fadeInLeft}>
            <h3 className="text-2xl font-semibold text-[#f9fafb] mb-6">Get in Touch</h3>
            <Motion.div className="grid grid-cols-1 md:grid-cols-1 gap-6" variants={staggerContainer}>
              {[
                { href: 'mailto:jerminbodcheo@gmail.com', icon: 'fas fa-envelope', title: 'Email', description: 'jerminbodcheo@gmail.com' },
                { href: 'https://linkedin.com/in/jerminodcheo', icon: 'fab fa-linkedin', title: 'LinkedIn', description: 'Connect with me', target: '_blank' },
                { href: 'https://github.com/Jermin-Odcheo', icon: 'fab fa-github', title: 'GitHub', description: 'View my code', target: '_blank' },
              ].map((c, i) => (
                <Motion.a key={c.title} href={c.href} target={c.target} rel={c.target ? 'noopener noreferrer' : undefined} className="group bg-[#374151]/20 backdrop-blur-sm p-6 rounded-xl hover:bg-[#374151]/30 transition-all border border-[#6b7280]/30 hover:border-[#9ca3af]/50 hover:shadow-xl hover:scale-105 duration-300" variants={staggerItem} custom={i}>
                  <i className={`${c.icon} text-3xl text-[#9ca3af] mb-4 group-hover:text-[#f9fafb] transition-colors`}></i>
                  <h4 className="font-semibold text-[#f9fafb] mb-2">{c.title}</h4>
                  <p className="text-[#9ca3af] group-hover:text-[#f9fafb] transition-colors">{c.description}</p>
                </Motion.a>
              ))}
            </Motion.div>
          </Motion.div>
          <Motion.div className="bg-[#374151]/20 backdrop-blur-sm p-8 rounded-xl border border-[#6b7280]/30" variants={fadeInRight}>
            <h3 className="text-2xl font-semibold text-[#f9fafb] mb-6">Send Message</h3>
            {cooldownTime > 0 && (
              <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center"><i className="fas fa-clock text-yellow-400 mr-2"></i><span className="text-yellow-400 font-medium">Rate limit active</span></div>
                  <div className="flex items-center space-x-2"><span className="text-yellow-400 text-sm">Next submission in:</span><span className="text-yellow-400 font-mono text-lg bg-yellow-500/20 px-2 py-1 rounded">{formatTime(cooldownTime)}</span></div>
                </div>
                <p className="text-yellow-300 text-sm mt-2">To prevent spam, you can send one message per minute.</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" name="honeypot" value={formData.honeypot} onChange={handleInputChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
              <div>
                <label htmlFor="name" className="block text-[#f9fafb] font-medium mb-2">Name *</label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} maxLength="50" disabled={isFormDisabled} className={`w-full px-4 py-3 bg-[#111827] border rounded-lg text-[#f9fafb] placeholder-[#9ca3af] focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-500 focus:ring-red-500' : isFormDisabled ? 'border-[#4b5563] bg-[#1f2937]' : 'border-[#6b7280] focus:ring-blue-500 focus:border-blue-500'}`} placeholder="Your full name" />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-[#f9fafb] font-medium mb-2">Email *</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} maxLength="100" disabled={isFormDisabled} className={`w-full px-4 py-3 bg-[#111827] border rounded-lg text-[#f9fafb] placeholder-[#9ca3af] focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : isFormDisabled ? 'border-[#4b5563] bg-[#1f2937]' : 'border-[#6b7280] focus:ring-blue-500 focus:border-blue-500'}`} placeholder="your.email@example.com" />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-[#f9fafb] font-medium mb-2">Message *</label>
                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleInputChange} maxLength="1000" disabled={isFormDisabled} className={`w-full px-4 py-3 bg-[#111827] border rounded-lg text-[#f9fafb] placeholder-[#9ca3af] focus:outline-none focus:ring-2 transition-all resize-vertical ${errors.message ? 'border-red-500 focus:ring-red-500' : isFormDisabled ? 'border-[#4b5563] bg-[#1f2937]' : 'border-[#6b7280] focus:ring-blue-500 focus:border-blue-500'}`} placeholder="What’s on your mind?"></textarea>
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                <p className="text-xs text-[#6b7280] mt-1">{formData.message.length}/1000 characters</p>
              </div>
              <button type="submit" disabled={isFormDisabled} className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${isFormDisabled ? 'bg-[#6b7280] cursor-not-allowed opacity-50' : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50'} text-white`}>
                {isSubmitting ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div><span>Sending...</span></>) : cooldownTime > 0 ? (<><i className="fas fa-clock"></i><span>Wait {formatTime(cooldownTime)}</span></>) : (<><i className="fas fa-paper-plane"></i><span>Send Message</span></>)}
              </button>
              {submitStatus === 'success' && (<div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg"><p className="text-green-400 text-center"><i className="fas fa-check-circle mr-2"></i>Message sent successfully! I'll get back to you soon.</p></div>)}
              {submitStatus === 'cooldown' && (<div className="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg"><p className="text-yellow-400 text-center"><i className="fas fa-hourglass-half mr-2"></i>Please wait before sending another message.</p></div>)}
              {submitStatus === 'error' && (<div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg"><p className="text-red-400 text-center"><i className="fas fa-exclamation-circle mr-2"></i>There was an error sending your message. Please try again or email me directly.</p></div>)}
            </form>
          </Motion.div>
        </div>
      </div>
    </Motion.section>
  );
}

function Footer() {
  return (
    <footer className="py-8 relative border-t border-[#6b7280]/30">
      <div className="container mx-auto px-6 text-center">
        <p className="text-[#9ca3af]">&copy; 2025 Jermin Odcheo. All rights reserved.</p>
      </div>
    </footer>
  );
}

// Pre-import chunk promises so Vite bundles them eagerly
const ExperienceChunk     = import('./components/Experience.jsx');
const ProjectsChunk       = import('./components/Projects.jsx');
const CertificationsChunk = import('./components/Certifications.jsx');

function App() {
  const [progress, setProgress] = useState(0);
  // Single object so loading→false and appReady→true always happen in ONE render,
  // preventing the one-frame flash where the hero is visible but still opacity-0.
  const [phase, setPhase] = useState({ loading: true, appReady: false });

  useEffect(() => {
    const preloadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = resolve;
        img.src = src;
      });

    const run = async () => {
      setProgress(10);
      const chunks = Promise.all([ExperienceChunk, ProjectsChunk, CertificationsChunk]);
      setProgress(25);
      const images = Promise.all([profileImageUrl].map(preloadImage));
      setProgress(40);
      await Promise.all([chunks, images]);
      setProgress(75);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      setProgress(90);
      await new Promise((r) => setTimeout(r, 350));
      setProgress(100);
    };

    run();
  }, []);

  // Called by LoadingScreen after its 500ms fade-out animation completes.
  // Atomically removes the loading screen AND enables hero animations in one render.
  const handleLoadDone = () => {
    setPhase({ loading: false, appReady: true });
  };

  return (
    <>
      {phase.loading && <LoadingScreen progress={progress} onDone={handleLoadDone} />}

      <AppReadyContext.Provider value={phase.appReady}>
        <div className="min-h-screen relative">
          <InteractiveBackground />
          <div className="relative z-10">
            <Navigation />
            <Hero />
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
            <Suspense fallback={null}>
              <Projects />
            </Suspense>
            <Suspense fallback={null}>
              <Certifications />
            </Suspense>
            <Contact />
            <Footer />
          </div>
        </div>
      </AppReadyContext.Provider>
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
