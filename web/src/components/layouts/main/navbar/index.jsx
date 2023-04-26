import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

// antd
import { Layout, Row, Col, Button, Space } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

// app
import { profileSt } from '@recoil/user/profile';
import Utils from '@src/services/helpers/utils';
import { BREAK_POINTS } from '@services/constants/theme';
import useMediaQuery from '@src/shared/hooks/useMediaQuery';

import { useLayoutState } from '../context';
import UserSettings from './UserSetting';
import I18NComponent from './I18n';
import SearchPost from './SearchPost';

const navRightStyle = { display: 'flex', paddingRight: 8, alignItems: 'center', justifyContent: 'flex-end' };

const LogoComponent = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate('/')} className="main-nav-logo">
      LOGO
    </Button>
  );
};
// -------------------------------
function Navbar() {
  const navigate = useNavigate();
  const { toggleMenu } = useLayoutState();
  const { width: screenWidth } = useMediaQuery();
  const isTablet = screenWidth <= BREAK_POINTS.md;
  const profile = useRecoilValue(profileSt);

  return (
    <Layout.Header className="header bg-white main-navbar">
      <Row className="main-container">
        <Col span={12} className="main-navbar-left">
          <Space size={8}>
            {isTablet && <MenuFoldOutlined onClick={toggleMenu} className="trigger" />}
            <LogoComponent />
            <SearchPost />
          </Space>
        </Col>
        <Col span={12} className="right" style={navRightStyle}>
          <Space size={8}>
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
