import * as React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';

// antd
import { Form, Input, notification } from 'antd';

// apps
import Utils from '@src/services/helpers/utils';
import { createGroup, updateGroup } from '@src/services/api/group';
import TransferInput from '@src/components/comon/input/transfer-input';

// variables
const formName = 'GroupForm';

const emptyFormData = { name: '', permissions: [] };

// ----------------------------------------------------------------
GroupForm.propTypes = {
  onChange: PropTypes.func,
  data: PropTypes.object,
  pems: PropTypes.array
};
function GroupForm({ onChange, data, pems }) {
  const [form] = Form.useForm();
  const initialValues = Utils.isBlankObj(data) ? emptyFormData : data;
  const { id } = initialValues;

  const formAttrs = {
    name: {
      name: 'name',
      label: t`Name`,
      rules: [{ required: true, message: t`This field is required!` }]
    },
    permissions: {
      name: 'permissions',
      label: t`Permissions`,
      rules: [{ required: true, message: t`This field is required!` }]
    }
  };

  const handleSubmit = (values) => {
    const action = id ? updateGroup(id, values) : createGroup(values);
    const actionMsg = id ? t`Update` : t`Create`;
    action
      .then((res) => {
        notification.success({ message: t`${actionMsg} role successfully!` });
        form.resetFields();
        onChange(id, res);
      })
      .catch((err) => {
        console.error(err);
        notification.error({ message: t`${actionMsg} role failed!` });
      });
  };

  return (
    <Form name={formName} form={form} initialValues={{ ...initialValues }} onFinish={handleSubmit} layout="vertical">
      <Form.Item {...formAttrs.name}>
        <Input autoFocus />
      </Form.Item>
      <Form.Item {...formAttrs.permissions}>
        <TransferInput options={pems} />
      </Form.Item>
    </Form>
  );
}

GroupForm.displayName = formName;
GroupForm.formName = formName;
export default GroupForm;
