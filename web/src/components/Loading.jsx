import React from 'react';

// antd
import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="global-spiner">
      <Spin />
    </div>
  );
}
