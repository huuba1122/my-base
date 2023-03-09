import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { t } from 'ttag';

// antd
import { Layout, Row, Col, Button, Dropdown, Avatar, Space } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

// app
import { profileSt } from '@recoil/user/profile';
import Utils from '@src/services/helpers/utils';
import { PRIVATE_PATHS } from '@routes/path';
import StorageService from '@services/helpers/local-storage';
import { userLogout } from '@src/services/api/auth';
import { useLayoutState } from './context';

// ----------------------------------------------------------------
const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const getColor = () => {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

const UserAvatar = React.forwardRef(({ label, onClick, color = '#f56a00' }, ref) => {
  const firstChar = label?.trim().charAt(0);

  return (
    <Avatar ref={ref} onClick={onClick} className="avatar-button" style={{ backgroundColor: color }}>
      {firstChar}
    </Avatar>
  );
});

UserAvatar.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string
};

const DropDownUserSettings = ({ username }) => {
  const navigate = useNavigate();

  const nodeRef = React.useRef(null);
  const color = React.useMemo(() => getColor(), []);

  const onLogout = () => {
    userLogout()
      .catch(console.log)
      .finally(() => {
        navigate('/');
        StorageService.clearToken();
      });
  };

  const items = [
    {
      label: <Link to={PRIVATE_PATHS.root}>{t`Manager`}</Link>,
      key: '1'
    },
    {
      label: <Space onClick={onLogout}>{t`Logout`}</Space>,
      key: '2'
    }
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} className="dropdown-user-setting">
      <UserAvatar label={username} ref={nodeRef} color={color} />
    </Dropdown>
  );
};

DropDownUserSettings.propTypes = {
  username: PropTypes.string
};

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
          {Utils.isBlankObj(profile) ? (
            <Button style={{ float: 'right' }} type="link" onClick={() => navigate('/login')}>
              Login
            </Button>
          ) : (
            <DropDownUserSettings username={profile.email} />
          )}
        </Col>
      </Row>
    </Layout.Header>
  );
}

Navbar.displayName = 'Navbar';

export default Navbar;
