import * as React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';

import { useRecoilValue } from 'recoil';

import { Form, Input, notification, Button } from 'antd';

import { resetPwd } from '@src/services/api/auth';
import { resetPwdSt } from '@src/recoil/auth/reset-pwd';

const formName = 'ResetPwdForm';
const initialValues = { otp_code: '', password: '', confirm_password: '' };

// ----------------------------------------------------------------
ResetPwdForm.propTypes = {
  onChange: PropTypes.func,
  isOTPExpired: PropTypes.bool
};

function ResetPwdForm({ onChange, isOTPExpired }) {
  const forgotPwdState = useRecoilValue(resetPwdSt);
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const formAttrs = {
    otp_code: {
      name: 'otp_code',
      label: t`OTP Code`,
      rules: [{ required: true, message: t`Please input your OTP code` }]
    },
    password: {
      name: 'password',
      label: t`Password`,

      rules: [{ required: true, message: 'Please input your password' }]
    },
    confirmPassword: {
      name: 'confirm_password',
      label: t`Confirm password`,

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
    const payload = { ...forgotPwdState, ...values };
    setLoading(true);
    resetPwd(payload)
      .then(onChange)
      .catch((err) => {
        console.error('reset password error: ', err);
        notification.error({ message: err.message || t`Reset password failed!` });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form name={formName} form={form} initialValues={{ ...initialValues }} onFinish={handleSubmit} layout="vertical">
      <Form.Item {...formAttrs.otp_code}>
        <Input autoFocus />
      </Form.Item>
      <Form.Item {...formAttrs.password}>
        <Input.Password size="large" placeholder="Password" />
        {/* <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />} /> */}
      </Form.Item>
      <Form.Item {...formAttrs.confirmPassword}>
        <Input.Password placeholder="Password confirm" size="large" />
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          disabled={isOTPExpired}
          type="primary"
          htmlType="submit"
          style={{ width: '100%' }}
          size="large"
        >
          {t`Submit`}
        </Button>
      </Form.Item>
    </Form>
  );
}

ResetPwdForm.displayName = formName;
ResetPwdForm.formName = formName;
export default ResetPwdForm;
