import React from 'react';
import { t } from 'ttag';

// ant
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const formName = 'ResetPwdForm';
const initialValues = {
  password: '',
  confirmPassword: ''
};
//----------------------------------------------------------------
function ResetPwdForm({ onChange }) {
  const [form] = Form.useForm();

  const formAttrs = {
    password: {
      name: 'password',
      rules: [{ required: true, message: 'Please input your password' }]
    },
    confirmPassword: {
      name: 'confirmPassword',
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
    // cal api submit here
    console.log('submit form forgot: ', values);
    onChange(values);
  };

  return (
    <Form name={formName} form={form} initialValues={initialValues} onFinish={handleSubmit}>
      <Form.Item {...formAttrs.password}>
        <Input.Password size="large" placeholder="Password" autoFocus prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item {...formAttrs.confirmPassword}>
        <Input.Password placeholder="Password confirm" size="large" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: 8 }} size="large">
          {t`Reset`}
        </Button>
      </Form.Item>
    </Form>
  );
}

ResetPwdForm.displayName = formName;
export default ResetPwdForm;
