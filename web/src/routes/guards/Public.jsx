import React from 'react';
import { Outlet } from 'react-router-dom';

function PublicRouter() {
  return <Outlet />;
}

PublicRouter.displayName = 'PublicRouter';
export default PublicRouter;
