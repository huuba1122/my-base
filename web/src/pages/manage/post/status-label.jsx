import React from 'react';

import { Tag } from 'antd';

const STATUS = [
  { value: 1, label: 'Deactivate', color: '#d9d9d9' },
  { value: 2, label: 'Pending', color: '#1677ff' },
  { value: 3, label: 'active', color: '#52c41a' }
];

const getStatus = (value) => STATUS.find((item) => item.value === value);

function Statuslabel({ value }) {
  const item = getStatus(value);
  return <Tag color={item.color}>{item.label}</Tag>;
}

export default Statuslabel;
