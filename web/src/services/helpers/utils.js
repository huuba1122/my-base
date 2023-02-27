class Utils {
  /**
   * Verify blank object
   * @param {object} obj
   * @returns {boolean}
   */
  static isBlankObj(obj) {
    if (obj.constructor === Object) return !Object.keys(obj).length;
    if (obj.constructor === Array) return !obj.length;
    return !obj;
  }
}

export default Utils;
