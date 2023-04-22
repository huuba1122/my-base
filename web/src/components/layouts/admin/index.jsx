import React from 'react';
import { Outlet } from 'react-router-dom';

// antd
import { Layout } from 'antd';

import LayoutProvider from './context';
import Sidebar from './sidebar';
import Footer from './Footer';
import Navbar from './navbar';

import './index.css';
// ----------------------------------------------------------------
const { Content } = Layout;

function MainLayout() {
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

export default MainLayout;
