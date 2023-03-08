import * as React from 'react';
import { t } from 'ttag';

// antd
import { Modal } from 'antd';

// apps
import { retrieveCategory } from '@services/api/category';
import Loading from '@components/Loading';
import Form from './form';

// ----------------------------------------------------------------
const CategoryDialog = React.forwardRef(({ onChange }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [id, setId] = React.useState(0);

  React.useImperativeHandle(ref, () => ({
    toggleModal: (id) => {
      setId(id);
      if (id) {
        setLoading(true);
        retrieveCategory(id)
          .then((category) => setData({ ...category, parent: category.parent?.id || null }))
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
      title={id ? t`Update Category` : t`Create new Category`}
      open={open}
      // onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ form: Form.formName, key: 'submit', htmlType: 'submit' }}
    >
      {loading ? <Loading /> : <Form onChange={onFinish} data={data} />}
    </Modal>
  );
});

CategoryDialog.displayName = 'CategoryDialog';
export default CategoryDialog;
