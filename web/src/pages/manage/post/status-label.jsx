import React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';

import { Tag } from 'antd';

const STATUS = [
  { value: 1, label: t`Deactivate`, color: '#d9d9d9' },
  { value: 2, label: t`Pending`, color: '#1677ff' },
  { value: 3, label: t`active`, color: '#52c41a' }
];

const getStatus = (value) => STATUS.find((item) => item.value === value);

Statuslabel.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

function Statuslabel({ value }) {
  const item = getStatus(value);
  return <Tag color={item.color}>{item.label}</Tag>;
}

export default Statuslabel;
