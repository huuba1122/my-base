import httpClient from './axios';

// variables
const urls = {
  profile: 'account/staff/profile/'
};

/**
 * Retrieve the user profile from server
 * @returns {Promise}
 */
export const fetchUserProfile = () => {
  return httpClient.get(urls.profile);
};
