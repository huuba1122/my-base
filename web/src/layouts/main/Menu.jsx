import React from 'react';
import { t } from 'ttag';
import { useNavigate, useLocation } from 'react-router-dom';

// antd
import { DashboardOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { PRIVATE_PATHS } from '@routes/path';

// ----------------------------------------------------------------

// ----------------------------------------------------------------
const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: PRIVATE_PATHS.root,
      label: t`Dashboard`,
      icon: <DashboardOutlined />
    },
    {
      key: PRIVATE_PATHS.staff.root,
      label: t`Staff`,
      icon: <UserOutlined />
    },
    {
      key: PRIVATE_PATHS.group.root,
      label: t`Group`,
      icon: <UsergroupAddOutlined />
    }
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      onClick={(item) => navigate(item.key)}
    />
  );
};

SidebarMenu.displayName = 'SidebarMenu';
export default SidebarMenu;
