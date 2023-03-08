import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

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

// public
const HomePage = lazyImport(lazy(() => import('@pages/home')));
const PostPage = lazyImport(lazy(() => import('@pages/post')));

// auth
const LoginPage = lazyImport(lazy(() => import('@pages/auth/login')));
const ForgotPwdPage = lazyImport(lazy(() => import('@pages/auth/forgot-pwd')));
const ResetPwdPage = lazyImport(lazy(() => import('@pages/auth/reset-pwd')));
const SignUpPage = lazyImport(lazy(() => import('@pages/auth/SignUp')));

// management
const ManagerDashboard = lazyImport(lazy(() => import('@src/pages/manage/dashboard')));
const ManagerStaffPage = lazyImport(lazy(() => import('@src/pages/manage/staff')));
const ManagerGroup = lazyImport(lazy(() => import('@src/pages/manage/group')));
const ManagerCategory = lazyImport(lazy(() => import('@src/pages/manage/category')));

const ManagerPost = lazyImport(lazy(() => import('@src/pages/manage/post')));
const ManagerPostForm = lazyImport(lazy(() => import('@src/pages/manage/post/form')));
const ManagerPostDetail = lazyImport(lazy(() => import('@src/pages/manage/post/detail')));

// ----------------------------------------------------------------
export default function IndexRoute() {
  return (
    <Routes>
      <Route path="/" element={<BlankLayout />}>
        <Route index element={<HomePage />} />
        <Route path={PUBLIC_PATHS.post.root} element={<PostPage />} />
        <Route path={AUTH_PATHS.login} element={<LoginPage />} />
        <Route path={AUTH_PATHS.signUp} element={<SignUpPage />} />
        <Route path={AUTH_PATHS.forgotPwd} element={<ForgotPwdPage />} />
        <Route path={AUTH_PATHS.resetPwd} element={<ResetPwdPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path={PRIVATE_PATHS.root} element={<PrivateRouter />}>
          <Route index element={<ManagerDashboard />} />
          <Route path={PRIVATE_PATHS.staff.root} element={<ManagerStaffPage />} />
          <Route path={PRIVATE_PATHS.group.root} element={<ManagerGroup />} />
          <Route path={PRIVATE_PATHS.category.root} element={<ManagerCategory />} />
          <Route path={PRIVATE_PATHS.post.root} element={<ManagerPost />} />
          <Route path={PRIVATE_PATHS.post.root}>
            <Route index element={<ManagerPost />} />
            <Route path={PRIVATE_PATHS.post.create} element={<ManagerPostForm />} />
            <Route path={PRIVATE_PATHS.post.edit} element={<ManagerPostForm />} />
            <Route path={PRIVATE_PATHS.post.detail} element={<ManagerPostDetail />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

  // return useRoutes([
  //   {
  //     element: <BlankLayout />,
  //     children: [
  //       { index: true, element: <HomePage /> },
  //       {
  //         path: PUBLIC_PATHS.post.root,
  //         element: <PostPage />
  //       },
  //       {
  //         path: AUTH_PATHS.login,
  //         element: <LoginPage />
  //       },
  //       {
  //         path: AUTH_PATHS.signUp,
  //         element: <SignUpPage />
  //       },
  //       {
  //         path: AUTH_PATHS.forgotPwd,
  //         element: <ForgotPwdPage />
  //       },
  //       {
  //         path: AUTH_PATHS.resetPwd,
  //         element: <ResetPwdPage />
  //       }
  //     ]
  //   },
  //   {
  //     element: <PrivateRouter />,
  //     children: [
  //       {
  //         element: <MainLayout />,
  //         children: [
  //           { path: PRIVATE_PATHS.root, element: <ManagerDashboard /> },
  //           { path: PRIVATE_PATHS.staff.root, element: <ManagerStaffPage /> },
  //           { path: PRIVATE_PATHS.group.root, element: <ManagerGroup /> }
  //         ]
  //       }
  //     ]
  //   },
  //   { path: '*', element: <NotFoundPage /> }
  // ]);
}
