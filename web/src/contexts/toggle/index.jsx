import * as React from 'react';
import PropTypes from 'prop-types';

const ToggleContext = React.createContext();
ToggleContext.displayName = 'ToggleContext';

Toggle.propTypes = {
  children: PropTypes.any
};

function Toggle(props) {
  const [value, setValue] = React.useState(false);
  const toggle = () => setValue((pre) => !pre);

  return <ToggleContext.Provider value={{ value, toggle }}>{props.children}</ToggleContext.Provider>;
}

function useToggle() {
  const context = React.useContext(ToggleContext);

  if (!context) throw new Error('useToggle must be used within a Toggle');
  return context;
}

export { useToggle };
export default Toggle;
