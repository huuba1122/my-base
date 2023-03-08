import * as React from 'react';
import { t } from 'ttag';
import { useRecoilValue } from 'recoil';

// antd
import { Form, Input, notification, Checkbox } from 'antd';

// apps
import { groupOptionsSlt } from '@src/recoil/user';
import Utils from '@src/services/helpers/utils';
import { createStaff, updateStaff } from '@src/services/api/staff';
import SelectInput from '@components/comon/input/select';

// variables
const formName = 'StaffForm';

const emptyFormData = { name: '', permissions: [] };

function StaffForm({ onChange, data }) {
  const [form] = Form.useForm();

  const initialValues = Utils.isBlankObj(data) ? emptyFormData : data;
  const { id } = initialValues;
  const groupOptions = useRecoilValue(groupOptionsSlt);

  React.useEffect(() => {
    if (!data) {
      form.resetFields();
    }
  }, [data]);

  const formAttrs = {
    email: {
      name: 'email',
      label: t`Email`,
      rules: [{ required: true, message: t`This field is required!` }]
    },
    phoneNumber: {
      name: 'phone_number',
      label: t`Phone number`
    },
    firstName: {
      name: 'first_name',
      label: t`First name`,
      rules: [{ required: true, message: t`This field is required!` }]
    },
    lastName: {
      name: 'last_name',
      label: t`Last name`,
      rules: [{ required: true, message: t`This field is required!` }]
    },
    groups: {
      name: 'groups',
      label: t`Groups`,
      rules: [{ required: true, message: t`This field is required!` }]
    },
    isActive: {
      name: 'is_active',
      label: t`User active`
    }
  };

  const handleSubmit = (values) => {
    const action = id ? updateStaff(id, values) : createStaff(values);
    action
      .then((res) => {
        notification.success({ message: t`${id ? 'Update' : 'Create'} staff successfully!` });
        form.resetFields();
        onChange(id, res);
      })
      .catch((err) => {
        console.error(err);
        notification.error({ message: t`${id ? 'Update' : 'Create'} staff failed!` });
      });
  };

  return (
    <Form
      name={formName}
      form={form}
      initialValues={{ ...initialValues }}
      onFinish={handleSubmit}
      labelAlign="left"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <Form.Item {...formAttrs.email}>
        <Input autoFocus type="email" size="large" />
      </Form.Item>
      <Form.Item {...formAttrs.phoneNumber}>
        <Input size="large" />
      </Form.Item>
      <Form.Item {...formAttrs.firstName}>
        <Input size="large" />
      </Form.Item>
      <Form.Item {...formAttrs.lastName}>
        <Input size="large" />
      </Form.Item>
      <Form.Item {...formAttrs.groups}>
        <SelectInput options={groupOptions} mode="multiple" size="large" />
      </Form.Item>
      <Form.Item {...formAttrs.isActive} valuePropName="checked">
        <Checkbox size="large" />
      </Form.Item>
    </Form>
  );
}

StaffForm.displayName = formName;
StaffForm.formName = formName;
export default StaffForm;
