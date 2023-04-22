import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import BlankLayout from '@src/components/layouts/blank';
import AdminLayout from '@src/components/layouts/admin';
import MainLayout from '@src/components/layouts/main';
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
const PostDetail = lazyImport(lazy(() => import('@pages/home/detail')));

// auth`
const LoginPage = lazyImport(lazy(() => import('@pages/auth/login')));
const ForgotPwdPage = lazyImport(lazy(() => import('@pages/auth/forgot-pwd')));
const ResetPwdPage = lazyImport(lazy(() => import('@pages/auth/reset-pwd')));
const SignUpPage = lazyImport(lazy(() => import('@pages/auth/SignUp')));

// management
const ManagerProfile = lazyImport(lazy(() => import('@pages/manage/staff/profile')));
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
        <Route path={PUBLIC_PATHS.post.root} element={<PostPage />} />
        <Route path={AUTH_PATHS.login} element={<LoginPage />} />
        <Route path={AUTH_PATHS.signUp} element={<SignUpPage />} />
        <Route path={AUTH_PATHS.forgotPwd} element={<ForgotPwdPage />} />
        <Route path={AUTH_PATHS.resetPwd} element={<ResetPwdPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path={PRIVATE_PATHS.root} element={<PrivateRouter />}>
          <Route index element={<ManagerProfile />} />
          <Route path={PRIVATE_PATHS.staff.root} element={<ManagerStaffPage />} />
          <Route path={PRIVATE_PATHS.group.root} element={<ManagerGroup />} />
          <Route path={PRIVATE_PATHS.category.root} element={<ManagerCategory />} />
          {/* <Route path={PRIVATE_PATHS.post.root} element={<ManagerPost />} /> */}
          <Route path={PRIVATE_PATHS.post.root}>
            <Route index element={<ManagerPost />} />
            <Route path={PRIVATE_PATHS.post.create} element={<ManagerPostForm />} />
            <Route path={PRIVATE_PATHS.post.edit} element={<ManagerPostForm />} />
            <Route path={PRIVATE_PATHS.post.detail} element={<ManagerPostDetail />} />
          </Route>
        </Route>
      </Route>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={PUBLIC_PATHS.post.detail} element={<PostDetail />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
