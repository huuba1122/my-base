/**
 * verify value is an array
 * @param {any} arr
 * @returns {boolean}
 */
function isArray(arr) {
  if (!arr) return false;
  return arr.constructor === Array;
}

/**
 * verify value is an object
 * @param {any} obj
 * @returns {boolean}
 */
function isPlainObject(obj) {
  if (!obj) return false;
  return obj.constructor === Object;
}

export { isArray, isPlainObject };
