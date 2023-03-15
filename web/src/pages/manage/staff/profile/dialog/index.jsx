import * as React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

// antd
import { Modal } from 'antd';

// apps
import { getProfile } from '@services/api/auth';
import { profileSt } from '@recoil/user/profile';
import Loading from '@components/Loading';

import Form from './form';

// ----------------------------------------------------------------
const ProfileFormDialog = React.forwardRef(({ onChange }, ref) => {
  const [data, setData] = useRecoilState(profileSt);

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    toggleModal: () => {
      setLoading(true);
      getProfile()
        .then(setData)
        .catch(console.log)
        .finally(() => {
          setLoading(false);
          handleToggle();
        });
    }
  }));

  const handleToggle = () => setOpen((pre) => !pre);

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (data) => {
    setOpen(false);
    onChange(data);
  };

  return (
    <Modal
      title={t`Update Profile`}
      open={open}
      // onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okButtonProps={{ form: Form.formName, key: 'submit', htmlType: 'submit' }}
    >
      {loading ? <Loading /> : <Form onChange={onFinish} data={data} onLoading={setConfirmLoading} />}
    </Modal>
  );
});

ProfileFormDialog.propTypes = {
  onChange: PropTypes.func
};

ProfileFormDialog.displayName = 'ProfileFormDialog';
export default ProfileFormDialog;
