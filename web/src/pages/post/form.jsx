import React from 'react';
import { t } from 'ttag';
import { v4 as uuid4 } from 'uuid';

// antd
import { Form, Input, Checkbox, Upload, Select, Button } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

// app
import { attachmentUrls } from '@services/api/urls';
import SunEditor from '@components/input/sun-editor';
import UploadInput from './upload-input';

const formName = 'PostForm';
const postUuid = uuid4();

const initialValues = {
  id: 0,
  title: '',
  banner: null,
  body: '',
  description: '',
  on_menu: false,
  status: 0
};
// ----------------------------------------------------------------
function PostForm({ onChange }) {
  const [form] = Form.useForm();

  const formAttrs = {
    title: {
      name: 'title',
      label: 'Title',
      rules: [{ required: true, message: 'Please input post title' }]
    },
    banner: {
      name: 'banner',
      label: 'Banner',
      valuePropName: 'file'
    },
    description: {
      name: 'description',
      label: 'Description'
    },
    body: {
      name: 'body',
      label: 'Content',
      rules: [{ required: true, message: 'Please input post content' }]
    },
    onMenu: {
      name: 'on_menu',
      label: 'Show on menu',
      valuePropName: 'checked'
    },
    status: {
      name: 'status',
      label: 'Status'
    }
  };

  const handleSubmit = (values) => {
    console.log('post form submit');
    console.log({ values });
  };

  return (
    <Form
      name={formName}
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      labelAlign="left"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item {...formAttrs.title}>
        <Input />
      </Form.Item>
      <Form.Item {...formAttrs.banner}>
        <UploadInput onChange={(file) => form.setFieldValue('banner', file)} />
      </Form.Item>
      <Form.Item {...formAttrs.description}>
        <Input.TextArea rows={6} />
      </Form.Item>
      <Form.Item {...formAttrs.body}>
        <SunEditor
          onChange={(text) => form.setFieldValue('body', text)}
          uploadTo={attachmentUrls.base}
          uid={postUuid}
        />
      </Form.Item>
      <Form.Item {...formAttrs.onMenu}>
        <Checkbox />
      </Form.Item>
      <Form.Item {...formAttrs.status}>
        <Select
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          options={[
            {
              value: '1',
              label: 'Pending'
            },
            {
              value: 'lucy',
              label: 'Public'
            },
            {
              value: '3',
              label: 'Disabled'
            }
          ]}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 4 }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: 8 }} size="large">
          {t`Submit`}
        </Button>
      </Form.Item>
    </Form>
  );
}

PostForm.displayName = formName;
export default PostForm;
