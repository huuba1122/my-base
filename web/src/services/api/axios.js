import axios from 'axios';
import { t } from 'ttag';

import { BASE_API_URL, LANGUAGE_DEFAULT } from '@src/configs';

import StorageService from '../helpers/local-storage';
import { redirectToLogin } from '../helpers/navigate';
import { ERROR_CODES } from '../constants/request';

// ----------------------------------------------------
const httpClient = axios.create({
  baseURL: BASE_API_URL
});

// add a request interceptor
httpClient.interceptors.request.use((request) => requestHandler(request));

// add a response interceptor
httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => responseErrorHandler(error)
);

export default httpClient;

const requestHandler = (request) => {
  request.withCredentials = false;
  //   request.xsrfHeaderName = 'X-CSRFToken';
  //   request.xsrfCookieName = 'csrftoken';
  const accessToken = StorageService.get('accessToken');
  request.headers = {
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    'Accept-Language': StorageService.get('lang') || LANGUAGE_DEFAULT
  };
  return request;
};

let refreshing = null;
const responseErrorHandler = async (axiosError) => {
  const originalConfig = axiosError.config;
  if (axiosError.response?.status === ERROR_CODES.invalidToken) {
    try {
      refreshing = refreshing || refreshToken(1);
      const { token } = await refreshing;
      StorageService.set('accessToken', token);
      return httpClient(originalConfig);
    } catch (error) {
      console.log('refresh token error', error);
      StorageService.clearToken();
      redirectToLogin();
      return Promise.reject(parseError(error));
    } finally {
      refreshing = null;
    }
  }
  return Promise.reject(parseError(axiosError));
};

/**
 * Refesh token expired
 * @returns {string}
 */
export const refreshToken = async () => {
  return new Promise((resolve, reject) => {
    const token = StorageService.getRefreshToken();
    const refreshUrl = `${BASE_API_URL}account/auth/refresh-token/`;
    const request = () => {
      axios
        .post(refreshUrl, { refresh_token: token })
        .then((res) => resolve(res.data))
        .catch((error) => {
          console.log('Error refreshing');
          reject(error);
        });
    };

    request();
  });
};

/**
 * @param {Object} axiosError
 * @returns {string}
 */
const parseError = (axiosError) => {
  const defaultErr = {
    detail: t`Something was wrong!`
  };
  const { data } = axiosError?.response ?? {};
  return data || defaultErr;
};
