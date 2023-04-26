import httpClient from './axios';

// variables
const url = 'config/';

/**
 * get list Categories
 * @returns {Promise}
 */
export const fetchConfiguaration = () => {
  return httpClient.get(url);
};
