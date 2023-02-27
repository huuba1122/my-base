import React from 'react';
import PropTypes from 'prop-types';

import './index.styles.css';
// ----------------------------------------------------------------
const doNothing = () => {};

function Switch({ on, onClick, className, ariaLabel, ...others }) {
  const btnClassName = [className, 'toggle-btn', on ? 'toggle-btn-on' : 'toggle-btn-off'].filter(Boolean).join(' ');
  return (
    <label aria-label={ariaLabel || 'Toggle'} style={{ display: 'block' }}>
      <input
        className="toggle-input"
        type="checkbox"
        checked={on}
        onChange={doNothing}
        onClick={onClick}
        data-testid="toggle-input"
      />
      <span className={btnClassName} {...others} />
    </label>
  );
}

Switch.displayName = 'BtnSwitch';
Switch.propTypes = {
  on: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  ariaLabel: PropTypes.string
};

export default Switch;
