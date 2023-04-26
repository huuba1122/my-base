/**
 * the file contains variables includes
 * config from .env
 * variable global
 */
const ENV_VARIABLES = import.meta.env;

/**
 * get environment variable
 * @param {string} key
 * @returns {string}
 */
const loadENVVariable = (key) => {
  if (!key) return '';
  const vitePrefix = 'VITE_';
  const name = key.startsWith(vitePrefix) ? key : `${vitePrefix}${key}`;
  return ENV_VARIABLES[name];
};

export const BASE_API_URL = loadENVVariable('BASE_API_URL');

export const LANGUAGE_DEFAULT = 'en';
export const LOCAL_STORAGE_PREFIX = 'base_';
