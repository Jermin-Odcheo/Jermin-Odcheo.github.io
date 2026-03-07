import React from 'react';
import { motion as Motion } from 'framer-motion';

// ─── Data ────────────────────────────────────────────────────────────────────
// Ordered Present → Past (most recent first)
// To add a new entry just push/unshift an object here — no JSX changes needed.
const experiences = [
  {
    year: '2025',
    title: 'Full Stack Web Developer Intern',
    organization: 'TMDD — Saint Louis University',
    period: 'Jan – May 2025',
    type: 'Internship',
    typeColor: 'text-blue-300 border-blue-500/40',
    dotColor: 'bg-blue-400',
    glowColor: 'shadow-blue-500/40',
    icon: 'fas fa-briefcase',
    iconGradient: 'from-blue-500 to-cyan-400',
    impact:
      'Led end-to-end build of a production-ready Inventory Management System — DB design to deployment.',
    highlights: [
      { icon: 'fas fa-layer-group', text: 'Role-based access control & secure auth' },
      { icon: 'fas fa-database',    text: 'Full MySQL schema — inventory & assets' },
      { icon: 'fas fa-sync-alt',    text: 'Real-time CRUD with full audit logging' },
      { icon: 'fas fa-file-export', text: 'PDF & Excel export via DomPDF / PHPOffice' },
    ],
    skills: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'HTML/CSS'],
  },
  {
    year: '2024',
    title: 'NaviBot — AI Chatbot',
    organization: 'SAMCIS, Saint Louis University',
    period: 'Aug – Dec 2024',
    type: 'Capstone',
    typeColor: 'text-purple-300 border-purple-500/40',
    dotColor: 'bg-purple-400',
    glowColor: 'shadow-purple-500/40',
    icon: 'fas fa-robot',
    iconGradient: 'from-purple-500 to-pink-400',
    impact:
      'Fine-tuned a BART model for student enrollment Q&A — achieved 72% accuracy.',
    highlights: [
      { icon: 'fas fa-brain',      text: 'Fine-tuned BART via transfer learning' },
      { icon: 'fas fa-cogs',       text: 'End-to-end data preprocessing pipeline' },
      { icon: 'fas fa-chart-line', text: 'Evaluated with BERTScore, BLEU & ROUGE' },
    ],
    skills: ['Python', 'PyTorch', 'NLP', 'BART', 'scikit-learn'],
  },
  {
    year: '2024',
    title: 'Self-Directed Learning',
    organization: 'Professional Development',
    period: '2024 – Present',
    type: 'Ongoing',
    typeColor: 'text-green-300 border-green-500/40',
    dotColor: 'bg-green-400',
    glowColor: 'shadow-green-500/40',
    icon: 'fas fa-laptop-code',
    iconGradient: 'from-green-500 to-teal-400',
    impact:
      'Actively building modern full-stack skills through hands-on projects and industry certifications.',
    highlights: [
      { icon: 'fas fa-globe',       text: 'Built this portfolio — React, Vite & Tailwind' },
      { icon: 'fas fa-code-branch', text: 'Version control & deploys via GitHub Pages' },
    ],
    skills: ['React', 'Tailwind CSS', 'Vite', 'Git', 'Node.js'],
  },
];

// ─── TimelineCard ─────────────────────────────────────────────────────────────
function TimelineCard({ exp }) {
  return (
    <div className="bg-[#374151]/15 backdrop-blur-sm rounded-2xl border border-[#6b7280]/25 hover:border-[#9ca3af]/40 hover:bg-[#374151]/25 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 overflow-hidden group">

      {/* Top colour strip */}
      <div className={`h-0.5 w-full bg-gradient-to-r ${exp.iconGradient}`} />

      <div className="p-5">

        {/* Row 1 — Type badge + period */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${exp.typeColor} bg-[#111827]/40`}>
            {exp.type}
          </span>
          <span className="text-[11px] text-[#6b7280]">{exp.period}</span>
        </div>

        {/* Row 2 — Icon + Title + Org */}
        <div className="flex items-start gap-3 mb-3">
          <div className={`flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${exp.iconGradient} flex items-center justify-center shadow-md`}>
            <i className={`${exp.icon} text-white text-sm`} />
          </div>
          <div>
            <h3 className="text-[#f9fafb] font-bold text-sm leading-snug">{exp.title}</h3>
            <p className="text-[#9ca3af] text-xs mt-0.5">{exp.organization}</p>
          </div>
        </div>

        {/* Row 3 — Impact */}
        <p className="text-[#9ca3af] text-xs leading-relaxed mb-3 border-l-2 border-[#6b7280]/40 pl-3">
          {exp.impact}
        </p>

        {/* Row 4 — Highlights */}
        <ul className="space-y-1 mb-4">
          {exp.highlights.map((h, j) => (
            <li key={j} className="flex items-start gap-2">
              <i className={`${h.icon} text-[#6b7280] text-[10px] mt-0.5 w-3 flex-shrink-0`} />
              <span className="text-[#d1d5db] text-xs leading-snug">{h.text}</span>
            </li>
          ))}
        </ul>

        {/* Row 5 — Skills */}
        <div className="flex flex-wrap gap-1.5">
          {exp.skills.map(skill => (
            <span
              key={skill}
              className="px-2 py-0.5 bg-[#111827]/50 text-[#9ca3af] text-[10px] font-medium rounded-full border border-[#6b7280]/30"
            >
              {skill}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}

// ─── Experience section ───────────────────────────────────────────────────────
export default function Experience() {
  return (
    <Motion.section
      id="experience"
      className="py-20 relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.05, once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6b7280] to-transparent" />

      <div className="container mx-auto px-6 max-w-5xl">

        {/* Heading */}
        <Motion.h2
          className="text-4xl font-bold text-[#f9fafb] text-center mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </Motion.h2>
        <Motion.p
          className="text-center text-[#6b7280] text-sm mb-14 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Present → Past
        </Motion.p>

        {/* Timeline */}
        <div className="relative">

          {/* Desktop centre spine */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#6b7280]/60 via-[#6b7280]/30 to-transparent pointer-events-none" />

          {/* Mobile left-edge spine */}
          <div className="md:hidden absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-[#6b7280]/60 via-[#6b7280]/30 to-transparent pointer-events-none" />

          <div className="space-y-8 md:space-y-6 pb-4">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0; // 0,2,… → left   1,3,… → right
              return (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* ── Desktop 3-col grid: [left card | dot+year | right card] ── */}
                  <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] md:items-start">

                    {/* Left card column */}
                    <div className="pr-4">
                      {isLeft && <TimelineCard exp={exp} />}
                    </div>

                    {/* Centre column — dot + year */}
                    <div className="flex flex-col items-center pt-4 gap-1">
                      <div className={`w-4 h-4 rounded-full border-2 border-[#111827] ${exp.dotColor} shadow-md ${exp.glowColor} z-10`} />
                      <span className="text-[9px] font-bold text-[#6b7280] tracking-widest uppercase mt-0.5">
                        {exp.year}
                      </span>
                    </div>

                    {/* Right card column */}
                    <div className="pl-4">
                      {!isLeft && <TimelineCard exp={exp} />}
                    </div>
                  </div>

                  {/* ── Mobile single-column ── */}
                  <div className="md:hidden flex items-start gap-4 pl-1">
                    <div className="flex flex-col items-center flex-shrink-0 pt-4">
                      <div className={`w-3 h-3 rounded-full border-2 border-[#111827] ${exp.dotColor} z-10`} />
                    </div>
                    <div className="flex-1 min-w-0 pb-2">
                      <p className="text-[10px] font-bold text-[#6b7280] tracking-widest uppercase mb-2">
                        {exp.year} · {exp.period}
                      </p>
                      <TimelineCard exp={exp} />
                    </div>
                  </div>
                </Motion.div>
              );
            })}
          </div>

          {/* Spine end cap */}
          <div className="hidden md:flex justify-center mt-1">
            <div className="w-2 h-2 rounded-full bg-[#6b7280]/40" />
          </div>
        </div>
      </div>
    </Motion.section>
  );
}

