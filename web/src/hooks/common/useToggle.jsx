import React from 'react';

export default function useToggle(defaultValue) {
  const [value, setValue] = React.useState(!!defaultValue);

  const toggle = () => setValue((pre) => !pre);

  return [value, toggle];
}
