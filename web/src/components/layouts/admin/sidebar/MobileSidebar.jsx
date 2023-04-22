import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// antd
import { Drawer } from 'antd';

import { useLayoutState } from '../context';

// -----------------------------------------------------
MobileSideBar.propTypes = {
  children: PropTypes.node
};

function MobileSideBar({ children }) {
  const { menuOpen, closeMenu } = useLayoutState();
  const { pathname } = useLocation();

  React.useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <Drawer
      title={<div className="logo" />}
      placement="left"
      closable={false}
      onClose={closeMenu}
      open={menuOpen}
      style={{
        backgroundColor: '#001529',
        padding: 0,
        width: 250
      }}
      contentWrapperStyle={{ width: 'unset' }}
      bodyStyle={{ padding: 0 }}
      headerStyle={{ padding: 0 }}
    >
      {children}
    </Drawer>
  );
}

MobileSideBar.displayName = 'MobileSideBar';
export default MobileSideBar;
