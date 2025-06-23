import React from 'react';

function ExperienceTimeline() {
    const experiences = [
        {
            id: 'internship',
            title: 'Web Development Internship',
            organization: 'TMDD SLU',
            period: 'Jan 2025 - May 2025',
            role: 'Web Developer Intern',
            project: 'Inventory Management System',
            description: 'Led development of a comprehensive inventory management system using PHP, featuring role-based access control, real-time updates, and modern UI components. Successfully deployed the system which streamlined inventory tracking processes and improved data management efficiency by 40% for the organization.',
            skills: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap', 'WAMP/XAMPP', 'Project Management'],
            icon: 'fa-solid fa-briefcase',
            color: 'bg-emerald-500',
            borderColor: 'border-emerald-500',
            achievements: ['Reduced manual tracking time by 40%', 'Implemented role-based security', 'Delivered on schedule']
        },
        {
            id: 'thesis',
            title: 'Capstone Research Project',
            organization: 'SAMCIS, Saint Louis University',
            period: 'Aug 2024 - Dec 2024',
            role: 'Lead Developer & Researcher',
            project: 'NaviBot - AI-Powered Academic Assistant',
            description: 'Designed and implemented an AI-powered chatbot utilizing generative AI and BART models to efficiently handle enrollment-related FAQs for the BSIT program. Achieved 72% accuracy in query resolution and reduced response time from hours to seconds for common student inquiries.',
            skills: ['Generative AI', 'Natural Language Processing', 'Python', 'BART', 'HTML/CSS', 'Research Methodology'],
            icon: 'fa-solid fa-robot',
            color: 'bg-blue-500',
            borderColor: 'border-blue-500',
            achievements: ['72% query accuracy rate', 'Reduced response time by 80%', 'Presented to academic panel']
        },
        {
            id: 'self-learning',
            title: 'Professional Development',
            organization: 'Self-Directed Learning',
            period: '2024 - Present',
            role: 'Full-Stack Developer',
            project: 'Modern Web Development Mastery',
            description: 'Proactively expanded expertise in cutting-edge web development technologies through structured self-learning. Built multiple projects including this portfolio, a task management app, and responsive web applications. Committed to staying current with industry trends and best practices.',
            skills: ['React', 'Tailwind CSS', 'Vite', 'JavaScript ES6+', 'Responsive Design', 'Git/GitHub'],
            icon: 'fa-solid fa-laptop-code',
            color: 'bg-purple-500',
            borderColor: 'border-purple-500',
            achievements: ['Built 5+ personal projects', 'Mastered modern frameworks', 'Active GitHub contributor']
        }
    ];

    return (
        <section id="experience" className="py-20 bg-slate-900 text-white">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-4">
                        &gt; Professional Journey:~$ <span className="inline-block blink text-green-400">▉</span>
                    </h2>
                    <p className="text-slate-300 text-xl max-w-3xl mx-auto">
                        From academic excellence to professional readiness - my journey of continuous learning and hands-on experience.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-slate-600 hidden md:block"></div>

                    {/* Timeline Items */}
                    <div className="space-y-12 relative">
                        {experiences.map((exp, index) => (
                            <div key={exp.id} className="relative flex items-center">
                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
                                    <div className={`p-6 bg-slate-800 rounded-xl border-l-4 ${exp.borderColor} shadow-lg hover:shadow-2xl hover:bg-slate-700 transition-all duration-300 transform hover:-translate-y-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <span className={`inline-block px-3 py-1 rounded-lg text-white text-xs font-bold mb-3 ${exp.color} shadow-md`}>
                                            {exp.period}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{exp.project}</h3>
                                        <h4 className="text-lg text-slate-200 mb-4 font-medium">{exp.title} • {exp.organization}</h4>
                                        <p className="text-slate-300 mb-4 leading-relaxed">{exp.description}</p>

                                        {/* Key Achievements */}
                                        <div className="mb-6">
                                            <h5 className="text-sm font-semibold text-slate-200 mb-2">Key Achievements:</h5>
                                            <ul className="text-sm text-slate-300 space-y-1">
                                                {exp.achievements.map((achievement, i) => (
                                                    <li key={i} className={`flex items-center ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                                        <i className="fa-solid fa-check text-green-400 mr-2 text-xs"></i>
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'justify-start'}`}>
                                            {exp.skills.map(skill => (
                                                <span key={skill} className="bg-slate-700 text-slate-200 px-3 py-1 rounded-lg text-sm font-medium border border-slate-600 hover:bg-slate-600 transition-colors duration-200">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Circle Icon - Always centered */}
                                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                                    <div className={`w-12 h-12 rounded-full ${exp.color} shadow-lg border-4 border-slate-900 hover:scale-110 transition-transform duration-200 flex items-center justify-center`}>
                                        <i className={`${exp.icon} text-white text-center`} style={{ fontSize: '16px' }}></i>
                                    </div>
                                </div>

                                {/* Mobile Icon (visible only on mobile) */}
                                <div className="flex items-center justify-center z-10 my-4 md:hidden">
                                    <div className={`w-12 h-12 rounded-full ${exp.color} shadow-lg border-4 border-slate-900 hover:scale-110 transition-transform duration-200 flex items-center justify-center`}>
                                        <i className={`${exp.icon} text-white text-center`} style={{ fontSize: '16px' }}></i>
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

export default ExperienceTimeline;