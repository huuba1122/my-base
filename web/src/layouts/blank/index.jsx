import React from 'react';
import { Outlet } from 'react-router-dom';

export default function BlankLayout() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgb(245, 245, 245)'
      }}
    >
      <Outlet />
    </div>
  );
}
