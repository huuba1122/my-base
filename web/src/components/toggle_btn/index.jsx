import * as React from 'react';
import PropTypes from 'prop-types';
import Toggle, { useToggle } from '@contexts/toggle';
import Switch from '../switch';

// ----------------------------------------------------------------
ToggleOn.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

function ToggleOn({ children }) {
  const { value } = useToggle();

  return value ? children : null;
}

ToggleOff.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};
function ToggleOff({ children }) {
  const { value } = useToggle();
  return value ? null : children;
}

function ToggleControl(props) {
  const { value, toggle } = useToggle();

  return <Switch on={value} onClick={toggle} {...props} />;
}

function ToggleButton() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>

        <div>
          <ToggleControl />
        </div>
      </Toggle>
    </div>
  );
}

export default ToggleButton;
