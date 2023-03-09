import React from 'react';
import { t } from 'ttag';

import { Form, Input, Button, notification } from 'antd';
import { MailOutlined } from '@ant-design/icons';

// apps
import { resetPwd } from '@services/api/auth';

function ForgotForm({ onChange }) {
  const [form] = Form.useForm();

  const [loading, setLoading] = React.useState(false);

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
    setLoading(true);
    resetPwd(values)
      .then((res) => onChange({ ...res, username: values.username }))
      .catch((error) => {
        console.error(error);
        notification.error({ message: t`Email invalid!` });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={handleSubmit}>
      <Form.Item {...formAttrs.username}>
        <Input size="large" autoFocus prefix={<MailOutlined />} type="email" />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit" style={{ width: '100%' }} size="large">
          {t`Send`}
        </Button>
      </Form.Item>
    </Form>
  );
}

ForgotForm.displayName = 'ForgotForm';
export default ForgotForm;
