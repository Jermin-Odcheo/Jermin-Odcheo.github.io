// EmailJS Configuration

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_28981m6',      // e.g., 'service_abc123'
  TEMPLATE_ID: 'template_cj6b5ke',    // e.g., 'template_xyz789'
  PUBLIC_KEY: 'sii1O-iJWiwvvrO1-',      // e.g., 'user_abcdef123456'
};

// Initialize EmailJS (call this once in your app)
export const initEmailJS = () => {
  import('@emailjs/browser').then((emailjs) => {
    emailjs.default.init(EMAILJS_CONFIG.PUBLIC_KEY);
  });
};
