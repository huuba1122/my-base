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

import { menuConfigSlt } from '@recoil/config';
import { useLayoutState } from '../context';
import MobileSideBar from './MobileSidebar';

const transferMenuItem = (menu) => {
  const { id: key, title: label, sub_categories: subMenus = [] } = menu;
  const children = subMenus.map(transferMenuItem);
  const result = { key, label };
  if (children.length) {
    result.children = children;
  }

  return result;
};

// ----------------------------------------------------------------
const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menuOpen } = useLayoutState();
  const menuConfig = useRecoilValue(menuConfigSlt);

  const { isMobile } = useMediaQuery();

  const [openKeys, setOpenKeys] = React.useState([]);

  const menuItems = React.useMemo(() => {
    return menuConfig.map(transferMenuItem);
  }, [menuConfig]);

  const onOpenChange = (keys) => {
    const rootSubmenuKeys = menuItems.map((item) => item.key);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    console.log({ keys, latestOpenKey, rootSubmenuKeys });
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleClickMenu = (item) => {
    console.log('clicked item: ', item);
  };

  if (isMobile)
    return (
      <MobileSideBar>
        <Menu
          mode="inline"
          // selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleClickMenu}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        />
      </MobileSideBar>
    );

  return (
    <Layout.Sider trigger={null} collapsible collapsed={menuOpen}>
      <div className="logo" />
      <Menu
        mode="inline"
        // selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleClickMenu}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      />
    </Layout.Sider>
  );
};

SidebarMenu.displayName = 'SidebarMenu';
export default SidebarMenu;
