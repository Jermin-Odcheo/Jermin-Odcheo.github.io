// src/js/components/Certifications.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp } from './animations.js';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import PdfJsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker';

// Certificate assets
import certHTB from '../../assets/certificates/Certificate-frankensteinz.pdf';
import certTHM from '../../assets/certificates/THM-3YAANKUEPF.pdf';
import certUdemyAI from '../../assets/certificates/UC-0497434b-3c91-4447-b8a1-9044d7dbeaad.pdf';
import certUdemyPython from '../../assets/certificates/UC-171e9dab-d53d-4b66-a57a-55e93a3cf0a5.pdf';
import certUdemyWeb from '../../assets/certificates/UC-9ebeab56-a4f1-4d4f-a1a7-1cfbb0901a8a.pdf';
import certIntern from '../../assets/certificates/COC.pdf';

// Modal animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
};

// Base certificate data
const baseCertificates = [
  {
    id: 'internship',
    platform: 'Saint Louis University',
    title: 'Certificate Internship',
    file: certIntern,
    icon: 'fas fa-school',
    tag: 'Full Stack Developer',
    colors: ['#44efc7', '#3160bc'],
    description: 'Certificate of completion for the Full Stack Web Developer Internship at Saint Louis University.',
  },
  {
    id: 'thm-hackfinity',
    platform: 'TryHackMe',
    title: 'Hackfinity',
    file: certTHM,
    icon: 'fas fa-lock',
    tag: 'Cybersecurity',
    colors: ['#ef4444', '#ec4899'],
    description: 'TryHackMe certificate for participating in the Hackfinity challenge event.',
  },
  {
    id: 'htb-eldoria',
    platform: 'HackTheBox',
    title: 'Tales of Eldoria',
    file: certHTB,
    icon: 'fas fa-shield-alt',
    tag: 'Cybersecurity',
    colors: ['#10b981', '#059669'],
    description: 'HackTheBox certificate for completing the Tales of Eldoria challenge series.',
  },
  {
    id: 'udemy-ai',
    platform: 'Udemy',
    title: 'AI',
    file: certUdemyAI,
    icon: 'fas fa-brain',
    tag: 'Artificial Intelligence',
    colors: ['#a855f7', '#6366f1'],
    description: 'Udemy completion certificate for foundational AI concepts and practical applications.',
  },
  {
    id: 'udemy-python',
    platform: 'Udemy',
    title: 'Python',
    file: certUdemyPython,
    icon: 'fab fa-python',
    tag: 'Programming',
    colors: ['#f59e0b', '#f97316'],
    description: 'Udemy completion certificate covering Python fundamentals and real-world exercises.',
  },
  {
    id: 'udemy-web',
    platform: 'Udemy',
    title: 'Web Development',
    file: certUdemyWeb,
    icon: 'fas fa-code',
    tag: 'Frontend/Backend',
    colors: ['#3b82f6', '#06b6d4'],
    description: 'Udemy completion certificate for modern frontend and backend web development.',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const generatePlaceholder = (title, platform, accentFrom, accentTo) => {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bg.addColorStop(0, '#1f2937');
  bg.addColorStop(1, '#374151');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const accent = ctx.createLinearGradient(0, 0, canvas.width, 0);
  accent.addColorStop(0, accentFrom);
  accent.addColorStop(1, accentTo);
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, canvas.width, 6);

  ctx.fillStyle = '#f9fafb';
  ctx.font = 'bold 32px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, canvas.width / 2, 195);

  ctx.font = '18px system-ui, sans-serif';
  ctx.fillStyle = '#9ca3af';
  ctx.fillText(platform, canvas.width / 2, 232);

  ctx.strokeStyle = 'rgba(156,163,175,0.15)';
  ctx.lineWidth = 1;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  return canvas.toDataURL('image/png');
};

const renderPdfToDataUrl = async (fileUrl, scale = 1.2) => {
  const pdf = await getDocument(fileUrl).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
  const url = canvas.toDataURL('image/png');
  canvas.width = 0;
  canvas.height = 0;
  return url;
};

// Component
export default function Certifications() {
  const { ref, inView } = useInView({ once: true, threshold: 0.1 });
  const [previewCert, setPreviewCert] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    try {
      if (!GlobalWorkerOptions.workerPort) {
        GlobalWorkerOptions.workerPort = new PdfJsWorker();
      }
    } catch (e) {
      console.warn('PDF.js worker setup failed, using placeholders.', e);
    }
  }, []);

  const [certificates, setCertificates] = useState(() =>
      baseCertificates.map((c) => ({
        ...c,
        preview: generatePlaceholder(c.title, c.platform, c.colors[0], c.colors[1]),
        full: null,
        tags: [c.platform, c.tag],
      }))
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const results = await Promise.allSettled(
          baseCertificates.map(async (c) => ({
            id: c.id,
            preview: await renderPdfToDataUrl(c.file, 0.9),
            full: await renderPdfToDataUrl(c.file, 1.8),
          }))
      );
      if (cancelled) return;
      setCertificates((prev) =>
          prev.map((c) => {
            const r = results.find((x) => x.status === 'fulfilled' && x.value.id === c.id);
            return r ? { ...c, preview: r.value.preview, full: r.value.full } : c;
          })
      );
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll active item into view in the list
  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]');
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  const active = certificates[activeIndex];

  return (
      <Motion.section
          ref={ref}
          id="certifications"
          className="py-20 sm:py-28 relative"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
      >
        {/* Divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6b7280]/40 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

          {/* ── Header ── */}
          <Motion.div
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-12 sm:mb-16"
              variants={fadeInUp}
          >
            <div>
              <p className="text-[#6b7280] text-xs tracking-[0.2em] uppercase font-medium mb-1.5">
                Credentials
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#f9fafb] leading-tight">
                Certifications
              </h2>
            </div>
            <span className="text-[#FFA500] text-sm font-mono tabular-nums">
            {String(certificates.length).padStart(2, '0')} Certificates
          </span>
          </Motion.div>

          {/* ── Main layout: featured + index ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 sm:gap-8">

            {/* Featured card */}
            <Motion.div variants={fadeInUp}>
              <div
                  className="relative rounded-2xl overflow-hidden cursor-pointer group border border-[#374151]/50 hover:border-[#4b5563] transition-colors duration-300 bg-[#0d1117]"
                  style={{ aspectRatio: '16 / 9' }}
                  onClick={() => setPreviewCert(active)}
              >
                <div
                  className="absolute inset-0 opacity-60"
                  style={{ background: `linear-gradient(135deg, ${active?.colors?.[0] || '#1f2937'}22, ${active?.colors?.[1] || '#374151'}22)` }}
                />
                <img
                  src={active?.preview}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover scale-105 blur-xl opacity-35"
                />
                <img
                    src={active?.preview}
                    alt={`${active?.platform} – ${active?.title}`}
                    loading="lazy"
                    className="relative z-10 w-full h-full object-contain p-1.5 sm:p-2 transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/72 via-black/12 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 z-30 p-5 sm:p-6 flex items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${active?.colors[0]}, ${active?.colors[1]})` }}
                      >
                        <i className={`${active?.icon} text-white text-[9px]`} />
                      </div>
                      <span className="text-[#9ca3af] text-xs font-medium tracking-wide">
                      {active?.platform}
                    </span>
                    </div>
                    <h3
                      className="text-[#f9fafb] text-lg sm:text-xl font-bold leading-snug max-w-sm"
                      style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)' }}
                    >
                      {active?.title}
                    </h3>
                    <p className="text-[#9ca3af] text-xs sm:text-sm mt-1.5 max-w-xs leading-relaxed line-clamp-2 hidden sm:block">
                      {active?.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-expand-alt text-white text-xs" />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3.5">
                {active?.tags.map((t) => (
                    <span
                        key={t}
                        className="px-2.5 py-1 bg-[#1f2937]/70 text-[#d1d5db] text-xs rounded-full border border-[#374151]/60"
                    >
                  {t}
                </span>
                ))}
              </div>
            </Motion.div>

            {/* Index list */}
            <Motion.div
                ref={listRef}
                variants={fadeInUp}
                className="flex flex-col gap-2 overflow-y-auto max-h-[380px] lg:max-h-none pr-0.5"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent' }}
            >
              {certificates.map((cert, i) => {
                const isActive = i === activeIndex;
                return (
                    <button
                        key={cert.id}
                        data-active={isActive}
                        onClick={() => setActiveIndex(i)}
                        className={[
                          'w-full text-left rounded-xl border flex items-center gap-3 p-2.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4b5563]',
                          isActive
                              ? 'bg-[#1f2937]/90 border-[#4b5563]'
                              : 'bg-transparent border-[#374151]/30 hover:bg-[#1f2937]/50 hover:border-[#374151]/70',
                        ].join(' ')}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#374151]/30">
                        <img
                            src={cert.preview}
                            alt=""
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={['text-sm font-semibold leading-tight truncate', isActive ? 'text-[#f9fafb]' : 'text-[#d1d5db]'].join(' ')}>
                          {cert.title}
                        </p>
                        <p className="text-[#6b7280] text-xs mt-0.5 truncate">{cert.platform}</p>
                      </div>
                      <span className={['text-xs tabular-nums font-mono flex-shrink-0', isActive ? 'text-[#9ca3af]' : 'text-[#374151]'].join(' ')}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                    </button>
                );
              })}
            </Motion.div>

          </div>

          {/* Mobile dot nav */}
          <div className="flex items-center justify-center gap-2 mt-5 lg:hidden">
            {certificates.map((_, i) => (
                <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Certificate ${i + 1}`}
                    className={[
                      'rounded-full transition-all duration-200',
                      i === activeIndex
                          ? 'w-5 h-1.5 bg-[#9ca3af]'
                          : 'w-1.5 h-1.5 bg-[#374151] hover:bg-[#6b7280]',
                    ].join(' ')}
                />
            ))}
          </div>

        </div>

        {/* ── Modal ── */}
        <AnimatePresence>
          {previewCert && (
              <Motion.div
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-3 sm:p-6"
                  variants={backdropVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setPreviewCert(null)}
              >
                <Motion.div
                    className="bg-[#111827] border border-[#374151] rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[#1f2937]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                          className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${previewCert.colors[0]}, ${previewCert.colors[1]})` }}
                      >
                        <i className={`${previewCert.icon} text-white text-[11px]`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[#f9fafb] font-semibold text-sm leading-tight truncate">{previewCert.title}</p>
                        <p className="text-[#6b7280] text-xs">{previewCert.platform}</p>
                      </div>
                    </div>
                    <button
                        onClick={() => setPreviewCert(null)}
                        className="ml-3 flex-shrink-0 w-8 h-8 rounded-lg bg-[#1f2937] hover:bg-[#374151] flex items-center justify-center text-[#6b7280] hover:text-[#f9fafb] transition-colors"
                        aria-label="Close preview"
                    >
                      <i className="fas fa-times text-xs" />
                    </button>
                  </div>

                  <div className="bg-[#0d1117] flex items-center justify-center p-3 sm:p-4 overflow-auto">
                    <img
                        src={previewCert.full || previewCert.preview}
                        alt={`${previewCert.platform} – ${previewCert.title}`}
                        loading="lazy"
                        className="w-full max-w-full max-h-[70vh] object-contain rounded-lg"
                    />
                  </div>

                  <div className="px-4 sm:px-5 py-3 border-t border-[#1f2937] flex items-center gap-2 flex-wrap">
                    {previewCert.tags.map((t) => (
                        <span
                            key={t}
                            className="px-2 py-0.5 bg-[#1f2937] text-[#9ca3af] text-xs rounded-full border border-[#374151]/50"
                        >
                    {t}
                  </span>
                    ))}
                  </div>
                </Motion.div>
              </Motion.div>
          )}
        </AnimatePresence>
      </Motion.section>
  );
}