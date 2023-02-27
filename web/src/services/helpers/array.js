/**
 * replacement item at index
 * return new list
 * @param {array} arr
 * @param {number} index
 * @param {any} newValue
 * @returns {array}
 */
function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

/**
 * return new list without item at index
 * @param {array} arr
 * @param {number} index
 * @returns {array}
 */
function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

/**
 * return new list with new item at first index
 * @param {array} arr
 * @param {any} newValue
 * @returns {array}
 */
function updateListWhenItemCreated(arr, newValue) {
  return [newValue, ...arr];
}

/**
 * return new list
 * with update item at position that satisfy cb function
 * @param {array} arr
 * @param {function} cb func validate item to replace
 * @param {any} newValue
 * @returns {array}
 */
function updateListWhenItemChanged(arr, cb, newValue) {
  return arr.map((item) => (cb(item) ? newValue : item));
}

export { removeItemAtIndex, replaceItemAtIndex, updateListWhenItemCreated, updateListWhenItemChanged };
