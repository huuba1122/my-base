import React from 'react';
import { Outlet } from 'react-router-dom';

// antd
import { Layout } from 'antd';

import LayoutProvider from './context';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Navbar from './NavBar';
import './index.css';
// ----------------------------------------------------------------
const { Content } = Layout;

function LayoutComponent() {
  console.log('Layout Component render');

  return (
    <LayoutProvider>
      <Layout className="bg-white main-layout">
        <Sidebar />
        <Layout>
          <Navbar />
          <Content className="bg-white main-contain">
            <Outlet />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </LayoutProvider>
  );
}

export default LayoutComponent;
