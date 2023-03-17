import { notification } from 'antd';

export default class FormUtils {
  /**
   * set form errors affter submit.
   *
   * @param {Object} form - Antd hook instance
   * @param {Object} errorDict - {str: str[]}
   */

  static setFormErrors(form = null) {
    return (errorDict) => {
      const formErrors = { ...errorDict };
      if ('detail' in errorDict) {
        notification.error({
          message: 'Error',
          description: errorDict.detail,
          duration: 8
        });
        delete formErrors.detail;
      }
      if (form)
        form.setFields(
          Object.entries(formErrors).map(([name, errors]) => ({
            name,
            errors: typeof errors === 'string' ? [errors] : errors
          }))
        );
    };
  }

  /**
   * get form data from object
   * @param {Object} values
   * @returns {FormData}
   */
  static getFormData(values) {
    if (!values || values.constructor !== Object) return values;
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value && value.constructor === Array) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    return formData;
  }
}
