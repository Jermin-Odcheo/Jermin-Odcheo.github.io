// Project filtering and interaction
document.addEventListener('DOMContentLoaded', function() {
    // Project filtering
    const filterBtns = document.querySelectorAll('.project-filter-btn, .filter-btn');
    const projectItems = document.querySelectorAll('.project-item, .project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-blue-600', 'text-white');
                b.classList.add('bg-gray-800', 'text-gray-200');
            });
            btn.classList.add('active', 'bg-blue-600', 'text-white');
            btn.classList.remove('bg-gray-800', 'text-gray-200');
            
            // Get filter value
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects with animation
            let visibleProjects = 0;
            let delay = 0;
            
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    // First hide it
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    // Then show it with delay
                    setTimeout(() => {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    }, delay);
                    
                    delay += 100;
                    visibleProjects++;
                } else {
                    // Hide with fade out
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show/hide empty state
            const emptyState = document.getElementById('empty-state');
            if (visibleProjects === 0 && emptyState) {
                emptyState.style.display = 'block';
                setTimeout(() => {
                    emptyState.style.opacity = '1';
                }, 300);
            } else if (emptyState) {
                emptyState.style.opacity = '0';
                setTimeout(() => {
                    emptyState.style.display = 'none';
                }, 300);
            }
        });
    });

    
    
    // Initialize projects with staggered reveal
    function initProjects() {
        let delay = 100;
        projectItems.forEach(item => {
            item.style.opacity = '0';
            // Only transform the card itself, not the section
            if (!item.classList.contains('section')) {
                item.style.transform = 'translateY(20px)';
            }
            
            setTimeout(() => {
                item.style.opacity = '1';
                if (!item.classList.contains('section')) {
                    item.style.transform = 'translateY(0)';
                }
            }, delay);
            
            delay += 100;
        });
    }
    
    // Use Intersection Observer to trigger animations when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If projects section is visible, initialize the animations
                if (entry.target.id === 'projects') {
                    initProjects();
                }
                
                // Trigger any other section-specific animations
                entry.target.classList.add('in-view');
                
                // Ensure section spacing is maintained
                entry.target.style.transition = 'opacity 0.5s ease';
                entry.target.style.opacity = '1';
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe sections for scroll animations but preserve spacing
    document.querySelectorAll('section').forEach(section => {
        // Set initial state but don't change the padding/margin
        section.style.opacity = '0.95';
        
        // Ensure we don't mess with padding or margin via JS
        const originalPadding = window.getComputedStyle(section).padding;
        const originalMargin = window.getComputedStyle(section).margin;
        
        // Apply preserved spacing
        section.setAttribute('data-original-padding', originalPadding);
        section.setAttribute('data-original-margin', originalMargin);
        
        observer.observe(section);
    });
    
    // Initialize project cards
    initProjects();
    
    // Add terminal typing effect to section headers
    document.querySelectorAll('section h2').forEach(header => {
        if (header.textContent.includes('$')) {
            const terminalPrompt = header.textContent.split('$')[0] + '$';
            const command = header.textContent.split('$')[1].replace('▉', '');
            
            header.innerHTML = terminalPrompt;
            
            let i = 0;
            const typeCommand = () => {
                if (i < command.length) {
                    header.innerHTML = terminalPrompt + command.substring(0, i+1) + '<span class="inline-block blink">▉</span>';
                    i++;
                    setTimeout(typeCommand, 100);
                } else {
                    header.innerHTML = terminalPrompt + command + '<span class="inline-block blink">▉</span>';
                }
            };
            
            // Start typing effect when section is in view
            const sectionObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(typeCommand, 500);
                    sectionObserver.unobserve(header);
                }
            }, { threshold: 0.5 });
            
            sectionObserver.observe(header.closest('section'));
        }
    });
    
    // Add explicit fix for section spacing
    function ensureSectionSpacing() {
        document.querySelectorAll('section').forEach(section => {
            // Force the browser to respect our Tailwind spacing classes
            const computedStyle = window.getComputedStyle(section);
            const currentPaddingTop = computedStyle.paddingTop;
            const currentPaddingBottom = computedStyle.paddingBottom;
            const currentMarginTop = computedStyle.marginTop;
            const currentMarginBottom = computedStyle.marginBottom;
            
            // Apply inline styles with !important to override any JS modifications
            section.style.setProperty('padding-top', currentPaddingTop, 'important');
            section.style.setProperty('padding-bottom', currentPaddingBottom, 'important');
            section.style.setProperty('margin-top', currentMarginTop, 'important');
            section.style.setProperty('margin-bottom', currentMarginBottom, 'important');
        });
    }
    
    // Call immediately and again after a short delay to ensure it's applied
    ensureSectionSpacing();
    setTimeout(ensureSectionSpacing, 500);
    setTimeout(ensureSectionSpacing, 1000);
    
    // Also ensure spacing is maintained on window resize
    window.addEventListener('resize', ensureSectionSpacing);
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
    
    // Force section spacing again after everything is loaded
    document.querySelectorAll('section').forEach(section => {
        const originalPaddings = section.className.split(' ')
            .filter(cls => cls.startsWith('p-') || cls.startsWith('pt-') || cls.startsWith('pb-') || 
                   cls.startsWith('m-') || cls.startsWith('mt-') || cls.startsWith('mb-'));
                   
        // Re-add classes to enforce them
        originalPaddings.forEach(cls => {
            section.classList.remove(cls);
            setTimeout(() => section.classList.add(cls), 10);
        });
    });
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
    // Animate skill bars on page load with delay for each bar
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const animateSkillBars = () => {
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-out';
                    bar.style.width = targetWidth;
                }, 50);
            }, index * 100); // Stagger the animations
        });
    };

    // Run animation when skills section is in view
    const skillsSection = document.getElementById('skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the section is visible
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Add hover effects for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Project card animations
document.addEventListener('DOMContentLoaded', function() {
    // Project filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const emptyState = document.getElementById('empty-state');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-gray-900', 'text-gray-50');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            this.classList.remove('bg-gray-200', 'text-gray-700');
            this.classList.add('active', 'bg-gray-900', 'text-gray-50');
            
            // Filter projects with animation
            let visibleProjects = 0;
            
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    // First hide all cards
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.display = 'block';
                    
                    // Then animate them in with a staggered delay
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                    
                    visibleProjects++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide empty state
            if (visibleProjects === 0) {
                emptyState.classList.remove('hidden');
            } else {
                emptyState.classList.add('hidden');
            }
        });
    });
    
    // Animate project cards on scroll
    const animateOnScroll = () => {
        const projectsSection = document.getElementById('projects');
        
        if (projectsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        projectCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(projectsSection);
            
            // Set initial state for animation
            projectCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.5s ease';
            });
        }
    };
    
    // Run animations
    animateOnScroll();
    

});

// Terminal typing effect
document.addEventListener('DOMContentLoaded', function() {
    const typingElements = document.querySelectorAll('h1, h2, h3').forEach(heading => {
        if (heading.textContent.includes(':~$')) {
            const terminalPrefix = heading.textContent.split(':~$')[0] + ':~$ ';
            const terminalText = heading.textContent.split(':~$')[1].trim().replace('▉', '');
            
            // Clear the heading text
            heading.textContent = '';
            
            // Create prefix span
            const prefixSpan = document.createElement('span');
            prefixSpan.textContent = terminalPrefix;
            heading.appendChild(prefixSpan);
            
            // Create typing span
            const typingSpan = document.createElement('span');
            heading.appendChild(typingSpan);
            
            // Create cursor span
            const cursorSpan = document.createElement('span');
            cursorSpan.textContent = '▉';
            cursorSpan.classList.add('blink');
            heading.appendChild(cursorSpan);
            
            // Type out the text
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < terminalText.length) {
                    typingSpan.textContent += terminalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        }
    });
}); 
