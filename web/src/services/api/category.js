import httpClient from './axios';

// variables
const url = 'articles/category/';

/**
 * get list Categories
 * @param {object} params
 * @returns {Promise}
 */
export const fetchCategories = (params) => {
  return httpClient.get(url, { params });
};

/**
 * retrieve Category
 * @param {number} id
 * @returns {Promise}
 */
export const retrieveCategory = (id) => {
  return httpClient.get(`${url}${id}/`);
};

/**
 * create Category
 * @param {object} data
 * @returns {Promise}
 */
export const createCategory = (data) => {
  return httpClient.post(url, data);
};

/**
 * update Category
 * @param {id} id
 * @param {object} data
 * @returns {Promise}
 */
export const updateCategory = (id, data) => {
  return httpClient.put(`${url}${id}/`, data);
};

/**
 * delete Category arcoding to Category id
 * @param {number} id
 * @returns {Promise}
 */
export const deleteCategory = (id) => {
  return httpClient.delete(`${url}${id}/`);
};
