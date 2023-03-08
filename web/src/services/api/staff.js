import httpClient from './axios';

// variables
const url = 'account/staff/';

/**
 * get list staff
 * @param {object} params
 * @returns {Promise}
 */
export const fetchStaffs = (params) => {
  return httpClient.get(url, { params });
};

/**
 * retrieve Staff
 * @param {number} id
 * @returns {Promise}
 */
export const retrieveStaff = (id) => {
  return httpClient.get(`${url}${id}/`);
};

/**
 * create Staff
 * @param {object} data
 * @returns {Promise}
 */
export const createStaff = (data) => {
  return httpClient.post(url, data);
};

/**
 * update Staff
 * @param {id} id
 * @param {object} data
 * @returns {Promise}
 */
export const updateStaff = (id, data) => {
  return httpClient.put(`${url}${id}/`, data);
};

/**
 * delete staff arcoding to staff id
 * @param {number} id
 * @returns {Promise}
 */
export const deleteStaff = (id) => {
  return httpClient.delete(`${url}${id}/`);
};
