import React from 'react';
import { t } from 'ttag';

import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

function ForgotForm({ onChange }) {
  const [form] = Form.useForm();

  const initialValues = {
    username: 'mrblack@email.com'
  };

  const formAttrs = {
    username: {
      name: 'username',
      rules: [{ required: true, message: 'Please input your email' }],
      placehoder: 'example@email.com'
    }
  };

  const handleSubmit = (values) => {
    // cal api submit here
    console.log('submit form forgot: ', values);
    onChange(values);
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={handleSubmit}>
      <Form.Item {...formAttrs.username}>
        <Input size="large" autoFocus prefix={<MailOutlined />} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }} size="large">
          {t`Send`}
        </Button>
      </Form.Item>
    </Form>
  );
}

ForgotForm.displayName = 'ForgotForm';
export default ForgotForm;
