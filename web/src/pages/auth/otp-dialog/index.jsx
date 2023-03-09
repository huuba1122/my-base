import * as React from 'react';
import { t } from 'ttag';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
// antd
import { Modal } from 'antd';

import { resetPwdSt } from '@recoil/auth/reset-pwd';
import Utils from '@services/helpers/utils';
import Form from './form';

const warningStyles = {
  color: '#faad14'
};

const expiredStyles = {
  color: '#f5222d'
};

// ----------------------------------------------------------------

CountDownBox.propTypes = {
  countDown: PropTypes.number
};

function CountDownBox({ countDown }) {
  console.log('countDown', countDown);

  if (countDown > 0) return <p style={warningStyles}>{t`The otp code will expire after ${countDown}`}</p>;
  return <p style={expiredStyles}>{t`The otp code has expired!`}</p>;
}

// ----------------------------------------------------------------
const OTPDialog = React.forwardRef(({ onChange, validTime }, ref) => {
  const { username = '' } = useRecoilValue(resetPwdSt);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleToggle = () => setOpen((pre) => !pre);

  React.useImperativeHandle(ref, () => ({
    toggleModal: () => {
      console.log('Toggle modal');
      handleToggle();
    }
  }));

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title={t`Reset your password`}
      open={open}
      // onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okButtonProps={{ form: Form.formName, key: 'submit', htmlType: 'submit' }}
    >
      {username ? <p>{t`The OTP code has been sent to ${Utils.maskEmail(username)}`}</p> : null}
      <CountDownBox countDown={validTime} />
      <Form onChange={onChange} onLoading={setLoading} />
    </Modal>
  );
});

OTPDialog.propTypes = {
  onChange: PropTypes.func,
  validTime: PropTypes.number
};

OTPDialog.displayName = 'OTPDialog';
export default OTPDialog;
