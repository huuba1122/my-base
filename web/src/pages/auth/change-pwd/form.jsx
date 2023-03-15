import React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';

// ant
import { Form, Input, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';

// apps
import { changePwd } from '@services/api/auth';

const formName = 'ChangePwdForm';
const initialValues = {
  old_password: '',
  password: '',
  confirm_password: ''
};
//----------------------------------------------------------------

ChangePwdForm.propTypes = {
  onChange: PropTypes.func,
  onLoading: PropTypes.func
};

function ChangePwdForm({ onChange, onLoading }) {
  const [form] = Form.useForm();

  const formAttrs = {
    oldPassword: {
      name: 'old_password',
      rules: [{ required: true, message: 'Please input your old password' }]
    },
    password: {
      name: 'password',
      rules: [{ required: true, message: 'Please input your password' }]
    },
    confirmPassword: {
      name: 'confirm_password',
      rules: [
        { required: true, message: 'Please confirm your password' },
        (formInstance) => ({
          validator(_, value) {
            if (!value || formInstance.getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The password does not match!'));
          }
        })
      ]
    }
  };

  const handleSubmit = (values) => {
    onLoading(true);
    changePwd(values)
      .then((res) => {
        onChange(res);
        notification.success({ message: t`Change password successfully!` });
      })
      .catch((err) => {
        console.log('change password error: ', err);
        notification.error({ message: t`Change password failed` });
      })
      .finally(() => onLoading(false));
  };

  return (
    <Form name={formName} form={form} initialValues={initialValues} onFinish={handleSubmit}>
      <Form.Item {...formAttrs.oldPassword}>
        <Input.Password size="large" placeholder="Old password" autoFocus prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item {...formAttrs.password}>
        <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item {...formAttrs.confirmPassword}>
        <Input.Password placeholder="Password confirm" size="large" prefix={<LockOutlined />} />
      </Form.Item>
    </Form>
  );
}

ChangePwdForm.displayName = formName;
export default ChangePwdForm;
