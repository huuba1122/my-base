import * as React from 'react';
import { t } from 'ttag';
import { useRecoilValue } from 'recoil';
import { Form, Input, notification } from 'antd';
import { resetPwdSt } from '@src/recoil/auth/reset-pwd';

import { resetPwd } from '@src/services/api/auth';

const formName = 'OTPDialogForm';
const initialValues = { otp_code: '', password: '', confirm_password: '' };

function OTPDialogForm({ onChange, onLoading }) {
  const forgotPwdState = useRecoilValue(resetPwdSt);
  console.log({ forgotPwdState });
  const [form] = Form.useForm();

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
    console.log('submit otp code: ', payload);
    onLoading(true);
    resetPwd(payload)
      .then(onChange)
      .catch((err) => {
        console.error('reset password error: ', err);
        notification.error({ message: err.message || t`Reset password failed!` });
      })
      .finally(() => onLoading(false));
  };

  return (
    <Form name={formName} form={form} initialValues={{ ...initialValues }} onFinish={handleSubmit} layout="vertical">
      <p>{t`The OTP code has been sent to`}</p>
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
    </Form>
  );
}

OTPDialogForm.displayName = formName;
OTPDialogForm.formName = formName;
export default OTPDialogForm;
