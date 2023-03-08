import httpClient from './axios';

// variables
const url = '/account/role/';

/**
 * fetch list group from server
 * @param {object} params
 * @returns {Promise}
 */
export const fetchGroups = (params) => {
  return httpClient.get(url, params);
};

/**
 * retrieve group
 * @param {number} id
 * @returns {Promise}
 */
export const retrieveGroup = (id) => {
  return httpClient.get(`${url}${id}/`);
};

/**
 * create group
 * @param {object} data
 * @returns {Promise}
 */
export const createGroup = (data) => {
  return httpClient.post(url, data);
};

/**
 * update group
 * @param {id} id
 * @param {object} data
 * @returns {Promise}
 */
export const updateGroup = (id, data) => {
  return httpClient.put(`${url}${id}/`, data);
};

/**
 * delete group arcoding to group id
 * @param {number} id
 * @returns {Promise}
 */
export const deleteGroup = (id) => {
  return httpClient.delete(`${url}${id}/`);
};
