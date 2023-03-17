import * as React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';

// antd
import { Modal } from 'antd';

// apps
import { retrieveGroup } from '@services/api/group';
import Loading from '@components/Loading';
import Form from './form';

// ----------------------------------------------------------------
const GroupDialog = React.forwardRef(({ pems, onChange }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [id, setId] = React.useState(0);

  React.useImperativeHandle(ref, () => ({
    toggleModal: (id) => {
      setId(id);
      if (id) {
        setLoading(true);
        retrieveGroup(id)
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
      title={id ? t`Update Role` : t`Create new Role`}
      open={open}
      // onOk={handleOk}
      onCancel={handleCancel}
      width="80%"
      okButtonProps={{ form: Form.formName, key: 'submit', htmlType: 'submit' }}
    >
      {loading ? <Loading /> : <Form onChange={onFinish} pems={pems} data={data} />}
    </Modal>
  );
});

GroupDialog.propTypes = {
  onChange: PropTypes.func,
  pems: PropTypes.array
};

GroupDialog.displayName = 'GroupDialog';
export default GroupDialog;
