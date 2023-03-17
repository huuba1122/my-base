import React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';
// antd
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// request
import { userLogIn } from '@services/api/auth';
import StorageService from '@src/services/helpers/local-storage';

// --------------------------------------------------
LoginForm.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.node
};

function LoginForm({ onChange, children }) {
  const [form] = Form.useForm();

  const initialValues = {
    username: 'mrblack@email.com',
    password: 'A@123456'
  };

  const formAttrs = {
    username: {
      name: 'username',
      rules: [{ required: true, message: t`Input your username` }],
      placehoder: t`Username`
    },
    password: {
      name: 'password',
      rules: [{ required: true, message: t`Input your password` }],
      placehoder: t`Password`,
      prefix: <LockOutlined />
    }
  };

  const handleSubmit = (values) => {
    userLogIn(values)
      .then((res) => {
        StorageService.setTokens(res);
        onChange(res);
      })
      .catch((e) => {
        notification.error({ message: e.detail });
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
          {t`Login`}
        </Button>
      </Form.Item>
    </Form>
  );
}

LoginForm.displayName = 'LoginForm';
export default LoginForm;
