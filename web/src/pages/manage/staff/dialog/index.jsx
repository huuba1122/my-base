import * as React from 'react';
import { t } from 'ttag';

// antd
import { Modal } from 'antd';

// apps
import { retrieveStaff } from '@services/api/staff';
import Loading from '@components/Loading';

import Form from './form';

// ----------------------------------------------------------------
const StaffFormDialog = React.forwardRef(({ onChange }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [id, setId] = React.useState(0);

  React.useImperativeHandle(ref, () => ({
    toggleModal: (id) => {
      setId(id);
      if (id) {
        setLoading(true);
        retrieveStaff(id)
          .then(setData)
          .catch(console.log)
          .finally(() => setLoading(false));
      } else {
        setData(null);
      }
      handleToggle();
    }
  }));

  const handleToggle = () => setOpen((pre) => !pre);

  const handleCancel = () => {
    setOpen(false);
    setData(null);
  };

  const onFinish = (id, data) => {
    setOpen(false);
    onChange(id, data);
  };

  return (
    <Modal
      title={id ? t`Update Staff` : t`Create new Staff`}
      open={open}
      // onOk={handleOk}
      onCancel={handleCancel}
      // width="80%"
      okButtonProps={{ form: Form.formName, key: 'submit', htmlType: 'submit' }}
    >
      {loading ? (
        <Loading />
      ) : (
        <div style={{ paddingTop: 16 }}>
          <Form onChange={onFinish} data={data} />
        </div>
      )}
    </Modal>
  );
});

StaffFormDialog.displayName = 'StaffFormDialog';
export default StaffFormDialog;
