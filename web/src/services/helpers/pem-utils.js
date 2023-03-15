export default class PemUtils {
  /**
   * Check user has pemissions
   * @param {Object} pems
   * @param {string} pemGroup
   * @param {string} action
   * @returns {Boolean}
   */
  static hasPem(pems, pemGroup, action = 'view') {
    try {
      return pems[pemGroup].includes(action);
    } catch (e) {
      return false;
    }
  }
}
