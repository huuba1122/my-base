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
const formName = 'UpdateProfileForm';

const emptyFormData = { name: '', permissions: [] };

function UpdateProfileForm({ onChange, data }) {
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
      <Form.Item {...formAttrs.phoneNumber}>
        <Input size="large" />
      </Form.Item>
      <Form.Item {...formAttrs.firstName}>
        <Input size="large" />
      </Form.Item>
      <Form.Item {...formAttrs.lastName}>
        <Input size="large" />
      </Form.Item>
    </Form>
  );
}

UpdateProfileForm.displayName = formName;
UpdateProfileForm.formName = formName;
export default UpdateProfileForm;
