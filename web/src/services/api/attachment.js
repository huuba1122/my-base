import httpClient from './axios';

// variables
const url = 'articles/attachment/';

/**
 * get list Attachment
 * @param {object} params
 * @returns {Promise}
 */
export const fetchAttachments = (params) => {
  return httpClient.get(url, { params });
};

/**
 * retrieve Attachment
 * @param {number} id
 * @returns {Promise}
 */
export const retrieveAttachment = (id) => {
  return httpClient.get(`${url}${id}/`);
};

/**
 * create Attachment
 * @param {FormData} data
 * @returns {Promise}
 */
export const createAttachment = (data) => {
  return httpClient.post(url, data);
};

/**
 * update Attachment
 * @param {id} id
 * @param {object} data
 * @returns {Promise}
 */
export const updateAttachment = (id, data) => {
  return httpClient.put(`${url}${id}/`, data);
};

/**
 * delete Attachment arcoding to Attachment id
 * @param {number} id
 * @returns {Promise}
 */
export const deleteAttachment = (id) => {
  return httpClient.delete(`${url}${id}/`);
};
