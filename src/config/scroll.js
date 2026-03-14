import { animateScroll as scroll } from 'react-scroll';

export const SCROLL_CONFIG = {
  duration: 650,
  smooth: 'easeInOutCubic',
};

const NAV_OFFSET = 16;

export const scrollToPageSection = sectionId => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const navOffset = sectionId === 'hero' ? 0 : NAV_OFFSET;
  const targetY = element.getBoundingClientRect().top + window.pageYOffset - navOffset;
  scroll.scrollTo(Math.max(0, targetY), SCROLL_CONFIG);
};

