import * as React from 'react';
import { t } from 'ttag';
import { Modal } from 'antd';
import Form from './form';

// ----------------------------------------------------------------
const OTPDialog = React.forwardRef(({ onChange }, ref) => {
  const [open, setOpen] = React.useState(false);

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
      title={t`OTP validation`}
      open={open}
      // onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ form: Form.formName, key: 'submit', htmlType: 'submit' }}>
      <Form onChange={onChange} />
    </Modal>
  );
});

OTPDialog.displayName = 'OTPDialog';
export default OTPDialog;
