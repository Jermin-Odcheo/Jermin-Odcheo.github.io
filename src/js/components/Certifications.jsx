// src/js/components/Certifications.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion as Motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from './animations.js';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import PdfJsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker';

// Certificate assets
import certHTB from '../../assets/certificates/Certificate-frankensteinz.pdf';
import certTHM from '../../assets/certificates/THM-3YAANKUEPF.pdf';
import certUdemyAI from '../../assets/certificates/UC-0497434b-3c91-4447-b8a1-9044d7dbeaad.pdf';
import certUdemyPython from '../../assets/certificates/UC-171e9dab-d53d-4b66-a57a-55e93a3cf0a5.pdf';
import certUdemyWeb from '../../assets/certificates/UC-9ebeab56-a4f1-4d4f-a1a7-1cfbb0901a8a.pdf';

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [previewCert, setPreviewCert] = useState(null);

  // Configure PDF.js worker once
  useEffect(() => {
    try {
      if (!GlobalWorkerOptions.workerPort) {
        GlobalWorkerOptions.workerPort = new PdfJsWorker();
      }
    } catch (e) {
      console.warn('PDF.js worker setup failed, using placeholders if needed.', e);
    }
  }, []);

  // Placeholder generator if PDF render fails
  const generatePlaceholder = (title, platform, accentFrom, accentTo) => {
    const canvas = document.createElement('canvas');
    canvas.width = 640; // 16:10 ratio
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, '#374151');
    bgGrad.addColorStop(1, '#6b7280');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const accent = ctx.createLinearGradient(0, 0, canvas.width, 0);
    accent.addColorStop(0, accentFrom);
    accent.addColorStop(1, accentTo);
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, canvas.width, 10);

    ctx.fillStyle = '#f9fafb';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, 190);

    ctx.font = '20px Arial';
    ctx.fillStyle = '#d1d5db';
    ctx.fillText(platform, canvas.width / 2, 230);

    ctx.strokeStyle = 'rgba(156, 163, 175, 0.35)';
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

    return canvas.toDataURL('image/png');
  };

  // Render a PDF page to a data URL at specified scale
  const renderPdfToDataUrl = async (fileUrl, scale = 1.2) => {
    const loadingTask = getDocument(fileUrl);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);

    await page.render({ canvasContext: context, viewport }).promise;
    const url = canvas.toDataURL('image/png');

    canvas.width = 0;
    canvas.height = 0;

    return url;
  };

  const baseCertificates = [
    {
      id: 'udemy-ai',
      platform: 'Udemy',
      title: 'AI',
      file: certUdemyAI,
      icon: 'fas fa-brain',
      tag: 'Artificial Intelligence',
      colors: ['#a855f7', '#6366f1'],
      description: 'Udemy completion certificate for foundational AI concepts and practical applications.'
    },
    {
      id: 'udemy-python',
      platform: 'Udemy',
      title: 'Python',
      file: certUdemyPython,
      icon: 'fab fa-python',
      tag: 'Programming',
      colors: ['#f59e0b', '#f97316'],
      description: 'Udemy completion certificate covering Python fundamentals and real-world exercises.'
    },
    {
      id: 'udemy-web',
      platform: 'Udemy',
      title: 'Web Development',
      file: certUdemyWeb,
      icon: 'fas fa-code',
      tag: 'Frontend/Backend',
      colors: ['#3b82f6', '#06b6d4'],
      description: 'Udemy completion certificate for modern frontend and backend web development.'
    },
    {
      id: 'htb-eldoria',
      platform: 'HackTheBox',
      title: 'Tales of Eldoria',
      file: certHTB,
      icon: 'fas fa-shield-alt',
      tag: 'Cybersecurity',
      colors: ['#10b981', '#059669'],
      description: 'HackTheBox certificate for completing the Tales of Eldoria challenge series.'
    },
    {
      id: 'thm-hackfinity',
      platform: 'TryHackMe',
      title: 'Hackfinity',
      file: certTHM,
      icon: 'fas fa-lock',
      tag: 'Cybersecurity',
      colors: ['#ef4444', '#ec4899'],
      description: 'TryHackMe certificate for participating in the Hackfinity challenge event.'
    }
  ];

  const [certificates, setCertificates] = useState(() =>
    baseCertificates.map((c) => ({
      ...c,
      preview: generatePlaceholder(c.title, c.platform, c.colors[0], c.colors[1]),
      full: null,
      tags: [c.platform, c.tag]
    }))
  );

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      try {
        const rendered = await Promise.allSettled(
          baseCertificates.map(async (c) => {
            const preview = await renderPdfToDataUrl(c.file, 0.9);
            const full = await renderPdfToDataUrl(c.file, 1.8);
            return { id: c.id, preview, full };
          })
        );

        if (isCancelled) return;

        setCertificates((prev) =>
          prev.map((c) => {
            const r = rendered.find((x) => x.status === 'fulfilled' && x.value.id === c.id);
            return r ? { ...c, preview: r.value.preview, full: r.value.full } : c;
          })
        );
      } catch (e) {
        console.warn('PDF rendering failed, using placeholders.', e);
      }
    })();

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Motion.section
      ref={ref}
      id="certifications"
      className="py-20 relative"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6b7280] to-transparent"></div>

      <div className="container mx-auto px-6 max-w-6xl">
        <Motion.h2 className="text-4xl font-bold text-[#f9fafb] text-center mb-16" variants={fadeInUp}>
          Certifications
        </Motion.h2>

        <Motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
          {certificates.map((cert, index) => (
            <Motion.div key={cert.id} className="group h-full" variants={fadeInUp} custom={index}>
              <div className="bg-[#374151]/20 backdrop-blur-sm rounded-xl overflow-hidden border border-[#6b7280]/30 hover:border-[#9ca3af]/50 hover:bg-[#374151]/30 transition-all duration-300 h-full flex flex-col">
                <div className="relative h-40 sm:h-48 overflow-hidden cursor-pointer" onClick={() => setPreviewCert(cert)}>
                  <img
                    src={cert.preview}
                    alt={`${cert.platform} - ${cert.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <i className="fas fa-expand text-white opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center shadow-sm`}
                      style={{ backgroundImage: `linear-gradient(135deg, ${cert.colors[0]}, ${cert.colors[1]})` }}
                      aria-hidden="true"
                    >
                      <i className={`${cert.icon} text-white text-base`}></i>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-bold text-[#f9fafb] leading-tight">{cert.title}</h3>
                      <p className="text-[#9ca3af] text-sm">{cert.platform}</p>
                    </div>
                  </div>

                  <p className="text-[#9ca3af] text-sm flex-1">{cert.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {cert.tags.map((t) => (
                      <span key={t} className="px-2 py-1 bg-[#6b7280]/30 text-[#f9fafb] text-xs rounded border border-[#9ca3af]/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Motion.div>
          ))}
        </Motion.div>
      </div>

      {previewCert && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-60 p-4" onClick={() => setPreviewCert(null)}>
          <div className="bg-[#1f2937] border border-[#4b5563] rounded-xl w-full max-w-3xl max-h-[80vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#374151] bg-[#111827]">
              <div>
                <h4 className="text-[#f9fafb] font-semibold">{previewCert.title}</h4>
                <p className="text-[#9ca3af] text-xs">{previewCert.platform}</p>
              </div>
              <button
                onClick={() => setPreviewCert(null)}
                className="text-[#9ca3af] hover:text-[#f9fafb] p-2 rounded-lg hover:bg-[#374151]/50 transition-colors"
                aria-label="Close preview"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="bg-[#111827] flex items-center justify-center p-3">
              <img
                src={previewCert.full || previewCert.preview}
                alt={`${previewCert.platform} - ${previewCert.title} preview`}
                loading="lazy"
                className="max-w-full max-h-[70vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </Motion.section>
  );
}
