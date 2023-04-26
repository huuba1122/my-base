import React from 'react';
import { Outlet } from 'react-router-dom';

// antd
import { Layout } from 'antd';

import LayoutProvider from './context';
import Footer from './Footer';
import Navbar from './navbar';

import './index.scss';
// ----------------------------------------------------------------
const { Content, Header } = Layout;

function MainLayout() {
  return (
    <LayoutProvider>
      <Layout>
        <Navbar />
        <Content className="main-container">
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </LayoutProvider>
  );
}

export default MainLayout;
