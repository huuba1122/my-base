import React from 'react';
import { t } from 'ttag';
import { useRecoilValue } from 'recoil';
import { useNavigate, useLocation } from 'react-router-dom';

// antd
import { Menu, Layout } from 'antd';
import { TeamOutlined, UserOutlined, UsergroupAddOutlined, ReadOutlined, FolderOutlined } from '@ant-design/icons';

// app
import { permissionsSlt } from '@recoil/user/profile';
import { localeState } from '@src/recoil/locale';

import PemUtils from '@services/helpers/pem-utils';
import Utils from '@services/helpers/utils';
import { PRIVATE_PATHS } from '@routes/path';
import { MANAGEMENT_MODEL, USER_ACTIONS } from '@services/constants';
import useMediaQuery from '@shared/hooks/useMediaQuery';
import { useLayoutState } from '../context';
import MobileSideBar from './MobileSidebar';

// ----------------------------------------------------------------
const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menuOpen } = useLayoutState();
  const userPems = useRecoilValue(permissionsSlt);
  const locale = useRecoilValue(localeState);

  const { isMobile } = useMediaQuery();

  console.log({ isMobile });

  const menuItems = React.useMemo(() => {
    const items = [
      {
        key: PRIVATE_PATHS.root,
        label: t`Profile`,
        icon: <UserOutlined />,
        active: true
      },
      {
        key: PRIVATE_PATHS.post.root,
        label: t`Article`,
        icon: <ReadOutlined />,
        active: PemUtils.hasPem(userPems, MANAGEMENT_MODEL.post, USER_ACTIONS.view)
      },
      {
        key: PRIVATE_PATHS.category.root,
        label: t`Category`,
        icon: <FolderOutlined />,
        active: PemUtils.hasPem(userPems, MANAGEMENT_MODEL.category, USER_ACTIONS.view)
      },
      {
        key: PRIVATE_PATHS.staff.root,
        label: t`Staff`,
        icon: <TeamOutlined />,
        active: PemUtils.hasPem(userPems, MANAGEMENT_MODEL.staff, USER_ACTIONS.view)
      },
      {
        key: PRIVATE_PATHS.group.root,
        label: t`Group`,
        icon: <UsergroupAddOutlined />,
        active: PemUtils.hasPem(userPems, MANAGEMENT_MODEL.group, USER_ACTIONS.view)
      }
    ];

    return items.filter((item) => item.active).map((item) => Utils.removeKeysInObject(item, ['active']));
  }, [userPems, locale]);

  if (isMobile)
    return (
      <MobileSideBar>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={(item) => navigate(item.key)}
        />
      </MobileSideBar>
    );

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
