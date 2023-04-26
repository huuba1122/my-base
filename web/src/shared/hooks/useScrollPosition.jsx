import React from 'react';

const defaultState = {
  position: 0,
  windowHeight: window.innerHeight,
  pageHeight: document.documentElement.scrollHeight,
  isBottom: false,
  isTop: false
};

/**
 * custom hooks get scroll info
 * @param {number} toTop to calculate has been top position
 * @param {number} toBottom to calculate has been bottom position
 * @returns
 */
export default function useScrollPosition(toTop = 100, toBottom = 0) {
  const [value, setValue] = React.useState(defaultState);

  React.useEffect(() => {
    const handleScroll = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const position = window.scrollY;
      const isBottom = pageHeight - (windowHeight + position) <= toBottom;
      const isTop = position <= toTop;

      setValue({ pageHeight, isBottom, isTop, position, windowHeight });
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return value;
}
