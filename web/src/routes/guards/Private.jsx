import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import StorageService from '@src/services/helpers/local-storage';
import { AUTH_PATHS } from '../path';

function PrivateRouter() {
  const token = StorageService.get('accessToken');

  return token ? <Outlet /> : <Navigate to={AUTH_PATHS.login} />;
}

PrivateRouter.displayName = 'PrivateRouter';
export default PrivateRouter;
