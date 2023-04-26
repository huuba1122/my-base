import React from 'react';
// import { t } from 'ttag';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';

// antd
import { Menu, Layout, Drawer } from 'antd';

// app
import useMediaQuery from '@shared/hooks/useMediaQuery';
import { filterPostSt } from '@src/recoil/post';

import { menuConfigSlt } from '@recoil/config';
import { useLayoutState } from '@components/layouts/main/context';
import { DEFAULT_MENU } from '@services/constants';
import { BREAK_POINTS } from '@services/constants/theme';

const transferMenuItem = (menu) => {
  const { id: key, title: label, sub_categories: subMenus = [] } = menu;
  const children = subMenus.map(transferMenuItem);
  const result = { key, label };
  if (children.length) {
    result.children = children;
  }

  return result;
};

const rootPath = '/';
// ----------------------------------------------------------------
const LeftBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const menuConfig = useRecoilValue(menuConfigSlt);
  const [filterPost, setFilterPost] = useRecoilState(filterPostSt);

  const { width: screenWidth } = useMediaQuery();
  const isTablet = screenWidth <= BREAK_POINTS.md;

  const [openKeys, setOpenKeys] = React.useState([]);

  const menuItems = React.useMemo(() => {
    return [DEFAULT_MENU, ...menuConfig].map(transferMenuItem);
  }, [menuConfig]);

  const onOpenChange = (keys) => {
    const rootSubmenuKeys = menuItems.map((item) => item.key);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleClickMenu = (item) => {
    const { key = '' } = item;
    setFilterPost({ ...filterPost, categories: key, page: 1 });
    if (pathname !== rootPath) navigate(rootPath);
  };

  if (isTablet)
    return (
      <MobileSideBar>
        <Menu
          mode="inline"
          items={menuItems}
          onClick={handleClickMenu}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        />
      </MobileSideBar>
    );

  return (
    <Layout.Sider trigger={null} collapsed={0} className="main-sidebar" width="100%">
      <Menu
        mode="inline"
        items={menuItems}
        onClick={handleClickMenu}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        className="main-menu-item"
      />
    </Layout.Sider>
  );
};

LeftBar.displayName = 'LeftBar';
export default LeftBar;

// ----------------------------------------------------------------

export const MobileSideBar = ({ children }) => {
  const { menuOpen, closeMenu } = useLayoutState();
  const { pathname } = useLocation();

  React.useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <Drawer
      // title={<div className="logo" />}
      placement="left"
      closable={false}
      onClose={closeMenu}
      open={menuOpen}
      style={{
        background: 'var(--bg-white)',
        padding: '16px 0',
        width: 250
      }}
      contentWrapperStyle={{ width: 'unset' }}
      bodyStyle={{ padding: 0 }}
      headerStyle={{ padding: 0 }}
    >
      {children}
    </Drawer>
  );
};

MobileSideBar.displayName = 'MobileSideBar';
