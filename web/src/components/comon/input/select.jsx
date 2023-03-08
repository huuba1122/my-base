import React from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';

import Utils from '@src/services/helpers/utils';

SelectInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  mode: PropTypes.string,
  blankLabel: PropTypes.string,
  allowClear: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string
};

export default function SelectInput({
  value,
  options,
  onChange,
  mode = null,
  blankLabel = '',
  allowClear = true,
  disabled = false,
  size = 'middle'
}) {
  function optionsWithBlankValue(options) {
    const isMulti = mode === 'multiple';
    if (isMulti || !blankLabel) return options;

    const blankOption = {
      value: null,
      label: `--- ${blankLabel} ---`
    };
    return [blankOption, ...options];
  }

  return (
    <Select
      showSearch
      allowClear={allowClear}
      value={value}
      mode={mode}
      size={size}
      disabled={disabled}
      onChange={onChange}
      filterOption={Utils.customFilterOption}
      options={optionsWithBlankValue(options)}
    />
  );
}
