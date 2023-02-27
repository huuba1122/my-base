const path = (parent, child) => `${parent}/${child}`;

const ROOT_PUBLIC = '';
const ROOT_ADMIN = '/manager';

const AUTH_PATHS = {
  login: path(ROOT_PUBLIC, 'login'),
  logout: path(ROOT_PUBLIC, 'logout'),
  signUp: path(ROOT_PUBLIC, 'sign-up'),
  forgotPwd: path(ROOT_PUBLIC, 'forgot-password'),
  resetPwd: path(ROOT_PUBLIC, 'reset-password')
};

const PUBLIC_PATHS = {
  home: ROOT_PUBLIC,
  post: {
    root: path(ROOT_PUBLIC, 'post'),
    detail: path(ROOT_PUBLIC, 'post/:id')
  }
};

const PRIVATE_PATHS = {
  root: ROOT_ADMIN,
  staff: {
    root: path(ROOT_ADMIN, 'staff'),
    detail: path(ROOT_ADMIN, 'staff/:id')
  },
  group: {
    root: path(ROOT_ADMIN, 'group')
  }
};

export { AUTH_PATHS, PUBLIC_PATHS, PRIVATE_PATHS };
