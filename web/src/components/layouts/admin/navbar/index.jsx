import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

// antd
import { Layout, Row, Col, Button, Space } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

// app
import { profileSt } from '@recoil/user/profile';
import Utils from '@src/services/helpers/utils';
import { useLayoutState } from '../context';
import UserSettings from './UserSetting';
import I18NComponent from './I18n';
// -------------------------------
function Navbar() {
  const navigate = useNavigate();
  const { menuOpen, toggleMenu } = useLayoutState();
  const profile = useRecoilValue(profileSt);

  return (
    <Layout.Header className="header bg-white main-navbar">
      <Row>
        <Col span={12}>
          {menuOpen ? (
            <MenuUnfoldOutlined onClick={toggleMenu} className="trigger" />
          ) : (
            <MenuFoldOutlined onClick={toggleMenu} className="trigger" />
          )}
        </Col>
        <Col
          span={12}
          className="right"
          style={{ display: 'flex', paddingRight: 20, alignItems: 'center', justifyContent: 'flex-end' }}
        >
          <Space size={16}>
            <I18NComponent />
            {Utils.isBlankObj(profile) ? (
              <Button style={{ float: 'right' }} type="link" onClick={() => navigate('/login')}>
                Login
              </Button>
            ) : (
              <UserSettings username={profile.email} />
            )}
          </Space>
        </Col>
      </Row>
    </Layout.Header>
  );
}

Navbar.displayName = 'Navbar';

export default Navbar;
