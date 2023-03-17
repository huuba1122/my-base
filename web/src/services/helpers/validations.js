/**
 * verify value is an array
 * @param {any} arr
 * @returns {boolean}
 */
export function isArray(arr) {
  if (!arr) return false;
  return arr.constructor === Array;
}

/**
 * verify value is an object
 * @param {any} obj
 * @returns {boolean}
 */
export function isPlainObject(obj) {
  if (!obj) return false;
  return obj.constructor === Object;
}

/**
 * validate phone number in Viet nam
 * @param {string} phoneNumber
 * @return {boolean}
 */
export const isPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false;
  const trimmedPhone = phoneNumber.replaceAll(' ', '');
  const pattern = /^((\+84|0)(3|5|7|8|9|24|28|2\d\d))([0-9]{8})$/;
  return pattern.test(trimmedPhone);
};
