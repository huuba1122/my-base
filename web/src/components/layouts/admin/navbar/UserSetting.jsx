import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import { t } from 'ttag';

// antd
import { Dropdown, Avatar, Space } from 'antd';

// app
import { PRIVATE_PATHS } from '@routes/path';
import StorageService from '@services/helpers/local-storage';
import { userLogout } from '@src/services/api/auth';

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

// -----------------------------------------------------------
UserSettings.propTypes = {
  username: PropTypes.string
};

function UserSettings({ username }) {
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
}

UserSettings.displayName = 'UserSettings';
export default UserSettings;
