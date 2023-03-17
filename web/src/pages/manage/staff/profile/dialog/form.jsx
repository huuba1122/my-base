import * as React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';

// antd
import { Form, Input, notification } from 'antd';

// apps
import { updateProfile } from '@services/api/auth';
import Utils from '@src/services/helpers/utils';
import { isPhoneNumber } from '@services/helpers/validations';

// variables
const formName = 'UpdateProfileForm';

const emptyFormData = { first_name: '', last_name: '', phone_number: '' };

//----------------------------------------------------------------
UpdateProfileForm.propTypes = {
  onChange: PropTypes.func,
  data: PropTypes.object,
  onLoading: PropTypes.func
};

function UpdateProfileForm({ onChange, data, onLoading }) {
  const [form] = Form.useForm();

  const initialValues = Utils.isBlankObj(data) ? emptyFormData : data;

  console.log({ initialValues });

  const formAttrs = {
    phoneNumber: {
      name: 'phone_number',
      label: t`Phone number`,
      rules: [
        {
          message: t`The phone number is not valid!`,
          validator(_, value) {
            if (value && !isPhoneNumber(value)) {
              return Promise.reject(new Error(t`The phone number is not valid!`));
            }
            return Promise.resolve();
          }
        }
      ]
    },
    firstName: {
      name: 'first_name',
      label: t`First name`,
      rules: [{ required: true, message: t`This field is required!` }]
    },
    lastName: {
      name: 'last_name',
      label: t`Last name`,
      rules: [{ required: true, message: t`This field is required!` }]
    }
  };

  const handleSubmit = (values) => {
    onLoading(true);
    updateProfile(values)
      .then((res) => {
        notification.success({ message: t`Update profile successfully!` });
        form.resetFields();
        onChange(res);
      })
      .catch((err) => {
        console.error(err);
        notification.error({ message: t`Update profile failed!` });
      })
      .finally(() => onLoading(false));
  };

  React.useEffect(() => {
    form.resetFields();
  }, [data]);

  return (
    <Form
      name={formName}
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      labelAlign="left"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <Form.Item {...formAttrs.firstName}>
        <Input size="large" />
      </Form.Item>
      <Form.Item {...formAttrs.lastName}>
        <Input size="large" />
      </Form.Item>
      <Form.Item {...formAttrs.phoneNumber}>
        <Input size="large" />
      </Form.Item>
    </Form>
  );
}

UpdateProfileForm.displayName = formName;
UpdateProfileForm.formName = formName;
export default UpdateProfileForm;
