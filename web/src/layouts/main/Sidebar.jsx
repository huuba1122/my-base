import React from 'react';
import { t } from 'ttag';
import { useNavigate, useLocation } from 'react-router-dom';

// antd
import { Menu, Layout } from 'antd';
import { DashboardOutlined, UserOutlined, UsergroupAddOutlined, ReadOutlined, FolderOutlined } from '@ant-design/icons';

// app
import { PRIVATE_PATHS } from '@routes/path';
import { useLayoutState } from './context';

// ----------------------------------------------------------------
const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menuOpen } = useLayoutState();

  const menuItems = [
    {
      key: PRIVATE_PATHS.root,
      label: t`Dashboard`,
      icon: <DashboardOutlined />
    },
    {
      key: PRIVATE_PATHS.post.root,
      label: t`Article`,
      icon: <ReadOutlined />
    },
    {
      key: PRIVATE_PATHS.category.root,
      label: t`Category`,
      icon: <FolderOutlined />
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
    <Layout.Sider trigger={null} collapsible collapsed={menuOpen}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={(item) => navigate(item.key)}
      />
    </Layout.Sider>
  );
};

SidebarMenu.displayName = 'SidebarMenu';
export default SidebarMenu;
