import * as React from 'react';
import { t } from 'ttag';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Form, Input } from 'antd';
import { resetPwdAtoms } from '@recoil/atoms/auth/reset-pwd';

const formName = 'OTPDialogForm';

function OTPDialogForm({ onChange }) {
  // const otpState = useRecoilValue(resetPwdAtoms);
  // console.log({ otpState });

  const [form] = Form.useForm();
  const initialValues = { otp_code: '' };

  const formAttrs = {
    otp_code: {
      name: 'otp_code',
      label: t`OTP Code`,
      rules: [{ require: true, message: t`Please input your OTP code` }]
    }
  };

  const handleSubmit = (values) => {
    console.log('submit otp code: ', { ...values });
    onChange({ values });
    // onChange({ username, ...values });
  };

  return (
    <Form name={formName} form={form} initialValues={{ ...initialValues }} onFinish={handleSubmit}>
      <p>{t`The OTP code has been sent to`}</p>
      <Form.Item {...formAttrs.otp_code}>
        <Input autoFocus />
      </Form.Item>
    </Form>
  );
}

OTPDialogForm.displayName = formName;
OTPDialogForm.formName = formName;
export default OTPDialogForm;
