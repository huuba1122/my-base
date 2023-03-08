import httpClient from './axios';

// variables
const url = 'articles/';

/**
 * get list Post
 * @param {object} params
 * @returns {Promise}
 */
export const fetchPosts = (params) => {
  return httpClient.get(url, { params });
};

/**
 * retrieve Post
 * @param {number} id
 * @returns {Promise}
 */
export const retrievePost = (id) => {
  return httpClient.get(`${url}${id}/`);
};

/**
 * create Post
 * @param {FormData} data
 * @returns {Promise}
 */
export const createPost = (data) => {
  return httpClient.post(url, data);
};

/**
 * update Post
 * @param {id} id
 * @param {FormData} data
 * @returns {Promise}
 */
export const updatePost = (id, data) => {
  return httpClient.put(`${url}${id}/`, data);
};

/**
 * delete Post arcoding to post id
 * @param {number} id
 * @returns {Promise}
 */
export const deletePost = (id) => {
  return httpClient.delete(`${url}${id}/`);
};
