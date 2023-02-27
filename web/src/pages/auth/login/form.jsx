import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// request
import axios from '@src/services/api/axios';
import StorageService from '@src/services/helpers/local-storage';
// --------------------------------------------------
function LoginForm({ onChange, children }) {
  const [form] = Form.useForm();

  const initialValues = {
    username: 'mrblack@email.com',
    password: 'A@123456'
  };

  const formAttrs = {
    username: {
      name: 'username',
      rules: [{ required: true, message: 'Please input your Username' }],
      placehoder: 'Username'
    },
    password: {
      name: 'password',
      rules: [{ required: true, message: 'Please input your Password' }],
      placehoder: 'Password',
      prefix: <LockOutlined />
    }
  };

  const handleSubmit = (values) => {
    axios.post('account/auth/login/', values).then((res) => {
      StorageService.setTokens(res);
      onChange(res);
    });
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={handleSubmit}>
      <Form.Item {...formAttrs.username}>
        <Input size="large" autoFocus prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item {...formAttrs.password}>
        <Input size="large" type="password" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item>{children}</Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }} size="large">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

LoginForm.displayName = 'LoginForm';
export default LoginForm;
