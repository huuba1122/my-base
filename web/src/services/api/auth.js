import httpClient from './axios';

// variables
const urls = {
  profile: 'account/staff/profile/',
  logout: 'account/auth/logout/',
  resetPwd: 'account/auth/reset-pwd/',
  changePwd: 'account/auth/change-pwd/'
};

/**
 * Retrieve the user profile from server
 * @returns {Promise}
 */
export const getProfile = () => {
  return httpClient.get(urls.profile);
};

export const userLogout = () => {
  return httpClient.post(urls.logout);
};

/**
 * Forgot password
 * @param {Object} params
 * @returns {Promise}
 */
export const resetPwd = (params) => {
  return httpClient.post(urls.resetPwd, params);
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({ verify_id: 'f3383333-c507-4b99-9ddf-0f67568c27de' });
  //   }, 1000);
  // });
};

/**
 * Change password
 * @param {Object} params
 * @returns {Promise}
 */
export const changePwd = (params) => {
  return httpClient.post(urls.changePwd, params);
};
