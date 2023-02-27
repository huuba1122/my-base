import React from 'react';

import { BREAK_POINTS } from '@services/constants/theme';

const initialValues = {
  width: 0,
  height: 0,
  isMobile: false,
  isSM: false,
  isMD: false,
  isLG: false
};

/**
 * return window info
 * @returns {object} includes width, height and type of breakpoints
 */
const getWindowSize = () => {
  if (typeof window !== 'undefined') {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth > BREAK_POINTS.xs && window.innerWidth < BREAK_POINTS.sm,
      isSM: window.innerWidth >= BREAK_POINTS.sm && window.innerWidth < BREAK_POINTS.md,
      isMD: window.innerWidth >= BREAK_POINTS.md && window.innerWidth < BREAK_POINTS.lg,
      isLG: window.innerWidth >= BREAK_POINTS.lg
    };
  }
  return initialValues;
};

export default function useMediaQuery() {
  const [windowSize, setWindowSize] = React.useState(getWindowSize());

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
