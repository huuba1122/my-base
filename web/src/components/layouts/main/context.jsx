import React from 'react';
// ----------------------------------------------------------------

const LayoutContext = React.createContext();

// ----------------------------------------------------------------
const LayoutProvider = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleMenu = React.useCallback(() => setCollapsed((pre) => !pre), []);
  const closeMenu = React.useCallback(() => setCollapsed(false), []);

  return (
    <LayoutContext.Provider value={{ menuOpen: collapsed, toggleMenu, closeMenu }}>{children}</LayoutContext.Provider>
  );
};

export const useLayoutState = () => React.useContext(LayoutContext);
export default LayoutProvider;
