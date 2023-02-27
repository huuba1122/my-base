import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// components
import BlankLayout from '@layouts/blank';
import MainLayout from '@layouts/main';
import Loading from '@components/Loading';
import NotFoundPage from '@components/NotFound';

//
import PrivateRouter from './guards/Private';
import { PUBLIC_PATHS, PRIVATE_PATHS, AUTH_PATHS } from './path';

// ----------------------------------------------------------------
const lazyImport = (Component) => (props) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Component {...props} />
    </React.Suspense>
  );
};

const HomePage = lazyImport(lazy(() => import('@pages/home')));
const LoginPage = lazyImport(lazy(() => import('@pages/auth/login')));
const ForgotPwdPage = lazyImport(lazy(() => import('@pages/auth/forgot-pwd')));
const ResetPwdPage = lazyImport(lazy(() => import('@pages/auth/reset-pwd')));

const SignUpPage = lazyImport(lazy(() => import('@pages/auth/SignUp')));
const PostPage = lazyImport(lazy(() => import('@pages/post')));
const ManagerStaffPage = lazyImport(lazy(() => import('@src/pages/manage/staff')));
const ManagerGroupPage = lazyImport(lazy(() => import('@src/pages/manage/group')));
const ManagerDashboardPage = lazyImport(lazy(() => import('@src/pages/manage/dashboard')));
// ----------------------------------------------------------------
export default function IndexRoute() {
  return useRoutes([
    {
      element: <BlankLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: PUBLIC_PATHS.post.root,
          element: <PostPage />
        },
        {
          path: AUTH_PATHS.login,
          element: <LoginPage />
        },
        {
          path: AUTH_PATHS.signUp,
          element: <SignUpPage />
        },
        {
          path: AUTH_PATHS.forgotPwd,
          element: <ForgotPwdPage />
        },
        {
          path: AUTH_PATHS.resetPwd,
          element: <ResetPwdPage />
        }
      ]
    },
    {
      element: <PrivateRouter />,
      children: [
        {
          element: <MainLayout />,
          children: [
            { path: PRIVATE_PATHS.root, element: <ManagerDashboardPage /> },
            { path: PRIVATE_PATHS.staff.root, element: <ManagerStaffPage /> },
            { path: PRIVATE_PATHS.group.root, element: <ManagerGroupPage /> }
          ]
        }
      ]
    },
    { path: '*', element: <NotFoundPage /> }
  ]);
}
