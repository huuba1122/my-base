import React from 'react';
import { t } from 'ttag';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

// antd
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, theme, Row, Col, Button } from 'antd';
import { PRIVATE_PATHS } from '@routes/path';
import SidebarMenu from './Menu';
import Footer from './Footer';
import './index.css';
// ----------------------------------------------------------------
const { Header, Content, Sider } = Layout;

// ----------------------------------------------------------------
const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);
  const toggle = () => setCollapsed(!collapsed);

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout>
      <Layout style={{ minHeight: '100vh', backgroundColor: colorBgContainer }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <SidebarMenu />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px'
          }}
        >
          <Header
            className="header"
            style={{
              padding: 0,
              background: colorBgContainer
            }}
          >
            <Row>
              <Col span={12}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: toggle
                })}
              </Col>
              <Col
                span={12}
                className="right"
                style={{ display: 'flex', paddingRight: 20, alignItems: 'center', justifyContent: 'flex-end' }}
              >
                <Button style={{ float: 'right' }} type="link" onClick={() => navigate('/login')}>
                  Login
                </Button>
                {/* <span
                  onClick={() => {}}
                  onKeyDown={() => {}}
                  onKeyUp={() => {}}
                  onKeyPress={() => {}}
                  className="pointer right"
                  role="button"
                  tabIndex="0">
                  <span>Mr Black</span>
                  &nbsp;&nbsp;
                  <LogoutOutlined />
                </span> */}
              </Col>
            </Row>
          </Header>
          <Breadcrumb
            style={{
              margin: '16px 0'
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer
            }}
          >
            <Outlet />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
