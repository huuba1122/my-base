import React from 'react';
import { t } from 'ttag';

// antd
import { Modal } from 'antd';

// app
import ChangePwdForm from './form';

// ----------------------------------------------------------------
const ChangePwdDialog = React.forwardRef(({ onChange }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    toggleModal: () => {
      setOpen((pre) => !pre);
    }
  }));

  const onFinish = (data) => {
    setOpen(false);
    onChange(data);
  };

  const handleCancel = () => {
    if (loading) return;
    setOpen(false);
  };

  return (
    <Modal
      title={t`Change password`}
      open={open}
      // onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okButtonProps={{ form: ChangePwdForm.formName, key: 'submit', htmlType: 'submit' }}
    >
      <ChangePwdForm onChange={onFinish} onLoading={setLoading} />
    </Modal>
  );
});

ChangePwdDialog.displayName = 'ChangePwdDialog';
export default ChangePwdDialog;
